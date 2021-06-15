/*
    Sample implementation for an experiment selector for the dashboard.
    Feel free to something completely different. There are no restrictions,
    as long as the returned types stay the same.
*/

<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let settings;

    const EXPERIMENTTYPES = {
        // TODO: Enter the correct values. Like 'performance: "Performance"'
        // key: value
    };

    export async function loadSettings(key) {
        let settings;

        switch (key) {
            case EXPERIMENTTYPES.key:
                // TODO: Enter the correct paths
                // The url needs to be a string literal
                settings = await import('@experiments/<subroot>/<experimentname>/Settings')
                break;
            default:
                settings = null;
        }

        dispatch('change', settings?.default);
    }

    export function loadViewer(key) {
        let viewerPromise;

        switch (key) {
            case EXPERIMENTTYPES.key:
                viewerPromise = import('@experiments/<subroot>/<experimentname>/Viewer');
                break;
            default:
                viewerPromise = null;
        }

        return viewerPromise;
    }
</script>


<style>
    select {
        width: 100%;
        height: 39px;

        margin: 0;
        padding-left: 30px;

        border: 0;

        font-size: 18px;
        color: white;

        background: var(--theme-color) 0 0 no-repeat padding-box;
    }

    select:disabled {
        background: #8e9ca9 0 0 no-repeat padding-box;
    }
</style>


<select id="experimenttype"
        on:change={(event) => loadSettings(event.target.value)}
        disabled="{Object.keys(EXPERIMENTTYPES).length === 0}">
    <option value="none">None</option>
    {#each Object.entries(EXPERIMENTTYPES) as [key, value]}
        <option value="{key}">{value}</option>
    {/each}
</select>


<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let settings = undefined; // TODO: is this needed?
    export let value = undefined; // TODO: is this needed?

    const EXPERIMENTTYPES = {
        //yourkey: 'yourvalue'
    };

    export function importExperiment(key) {
        let settings = null;
        let viewer = null;
        switch (key) {
            //case 'yourkey':
            //    settings = import('@experiments/<subroot>/<experimentname>/Settings.svelte')
            //    viewer = import('@experiments/<subroot>/<experimentname>/Viewer.svelte');
            //    break;
            default:
                settings = null;
                viewer = null;
                break;
        }
        // NOTE: The return value of import is only a Promise, which needs to be resolved later

        dispatch('change', {settings, viewer, key});
        return {settings, viewer, key};
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
        on:change={(event) => importExperiment(event.target.value)}
        disabled="{Object.keys(EXPERIMENTTYPES).length === 0}">
    <option value="none">None</option>
    {#each Object.entries(EXPERIMENTTYPES) as [key, value]}
        <option value="{key}">{value}</option>
    {/each}
</select>


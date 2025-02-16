<!--
  (c) 2021 Open AR Cloud
  This code is licensed under MIT license (see LICENSE for details)
-->

<!--
    This component displays the internals of the app, and allows to change them when possible.
    Temporary until better UX is found for the settings.
-->
<script>
    import { createEventDispatcher } from 'svelte';

    import { supportedCountries} from 'ssd-access';

    import { showDashboard, initialLocation, availableGeoPoseServices, availableContentServices, availableP2pServices,
        selectedGeoPoseService, selectedContentServices, selectedP2pService, arMode,
        currentMarkerImage, currentMarkerImageWidth, recentLocalisation,
        allowP2pNetwork, p2pNetworkState, isLocationAccessAllowed, dashboardDetail,
        creatorModeSettings, experimentModeSettings, debug_appendCameraImage, debug_showLocalAxes
    } from '@src/stateStore';

    import { ARMODES, CREATIONTYPES, PLACEHOLDERSHAPES } from '@core/common';

    import Selector from '@experiments/Selector';


    // Used to dispatch events to parent
    const dispatch = createEventDispatcher();

    let experimentDetail = null;


    function handleContentServiceSelection(event, service) {
        if (!$selectedContentServices[service.id]) {
            $selectedContentServices[service.id] = {};
        }

        $selectedContentServices[service.id].isSelected = event.target.checked;
    }

    function handleContentServiceTopicSelection(event, service, topic) {
        $selectedContentServices[service.id].selectedTopic = topic;
    }
</script>


<style>
    h2, summary {
        margin-top: 60px;
        margin-bottom: 15px;
        color: var(--theme-highlight);


        font-size: 1.5em;
        font-weight: bold;
    }

    legend h4 {
        margin-bottom: 0;
    }

    button {
        width: 100%;
        height: 50px;

        border: 2px solid var(--theme-color);

        text-transform: uppercase;
        font-weight: bold;
        font-size: 25px;
        letter-spacing: 0;

        background-color: white;
    }

    :global(.dashboard dt), .label {
        height: 20px;

        margin-bottom: 6px;

        font-weight: bold;
        text-align: left;
    }

    :global(.dashboard dd), .value {
        display: flex;
        align-items: center;

        margin-left: 0;
        margin-bottom: 20px;
        padding-left: 40px;

        height: 39px;
        border: 1px solid var(--theme-color);
    }

    :global(.dashboard dd.area) {
        display: block;
        height: auto;
        padding: 0;
    }

    :global(.dashboard dd.area textarea) {
        display: block;
        width: -webkit-fill-available;
        height: 75px;
        border: 0;
        resize: none;
    }

    :global(.dashboard dd.list) {
        border: 0;
        padding: 0;
    }

    :global(.dashboard dd.list input) {
        width: 100%;
        height: 39px;

        margin-top: 6px;
        padding-left: 40px;

        font-size: 18px;
    }

    :global(.dashboard dd.unitinput) {
        padding: 3px;
    }

    :global(.dashboard dd.unitinput input) {
        width: 100%;
        height: 37px;

        padding-left: 40px;

        border: 0;
    }

    :global(.dashboard dl.radio) {
        margin-top: 35px;
        margin-bottom: 60px;
    }

    :global(.dashboard dl.radio dd) {
        height: 22px;

        padding-left: 0;
        border: 0;
    }

    :global(.dashboard dl.radio.connected) {
        margin-top: 7px;
        margin-bottom: 30px;
    }

    :global(.dashboard dl.nested dd) {
        display: block;
        height: auto;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    :global(.dashboard dl.nested p) {
        margin: 0;
    }

    :global(.dashboard dl.nested ul) {
        margin: 0;
        list-style: none;
        padding: 0;
    }

    :global(.dashboard dd.select) {
        border: 0;
        padding: 0;
    }

    :global(.dashboard fieldset) {
        margin: 0;
        padding: 0;
        border: 0;
    }

    :global(.dashboard input[type=checkbox]) {
        margin-bottom: 14px;
    }

    :global(.dashboard select) {
        width: 100%;
        height: 39px;

        margin: 0;
        padding-left: 30px;

        border: 0;

        font-size: 18px;
        color: white;

        background: var(--theme-color) 0 0 no-repeat padding-box;
    }

    :global(.dashboard select:disabled) {
        background: #8e9ca9 0 0 no-repeat padding-box;
    }

    pre {
        margin: 5px;
    }

    #showagain {
        margin-top: 20px;
        margin-bottom: 26px;
    }

    .autoheight {
        height: initial;

        padding: 0;
    }

    .note {
        color: red;
        margin-top: -15px;
    }

    .serviceurl {
        font-size: 8px;
    }
</style>


<button on:click={() => dispatch('okClicked')}>Go immersive</button>

<details class="dashboard" bind:open="{$dashboardDetail.state}">
    <summary>Application state</summary>

    <div>
        <input id="showagain" type="checkbox" bind:checked={$showDashboard} />
        <label for="showagain">Show Dashboard next time</label>
    </div>

    <dl>
        <dt>Location access</dt>
        <dd>{$isLocationAccessAllowed ? 'Allowed' : 'Not allowed'}</dd>
        {#if !isLocationAccessAllowed}
            <dd>Request access</dd>
        {/if}
    </dl>

    <dl>
        <dt>H3Index</dt>
        <dd>{$initialLocation.h3Index}</dd>
        <dt>Country</dt>
        <dd>{$initialLocation.countryCode}</dd>
        <dt>OSCP Region</dt>
        <!--  TODO: Might make sense to do some validation here  -->
        <dd class="list"><input list="supported-countries" bind:value={$initialLocation.regionCode} /></dd>
    </dl>

    <dl class="radio connected">
        <dt>AR mode</dt>
        <dd>
            <input id="armodeoscp" type="radio" bind:group={$arMode} value="{ARMODES.oscp}" />
            <label for="armodeoscp">{ARMODES.oscp}</label>
        </dd>
        <dd>
            <input id="armodecreator" type="radio" bind:group={$arMode} value="{ARMODES.create}" />
            <label for="armodecreator">{ARMODES.create}</label>
        </dd>
        <dd>
            <input id="armodedev" type="radio" bind:group={$arMode} value="{ARMODES.develop}" />
            <label for="armodedev">{ARMODES.develop}</label>
        </dd>
        <dd>
            <input id="armodetest" type="radio" bind:group={$arMode} value="{ARMODES.experiment}" />
            <label for="armodetest">{ARMODES.experiment}</label>
        </dd>
    </dl>

    {#if $arMode === ARMODES.oscp}
    <dl>
        <dt><label for="geoposeServer">GeoPose Service</label></dt>
        <dd class="select">
            <select id="geoposeServer" bind:value={$selectedGeoPoseService}
                    disabled="{$availableGeoPoseServices.length < 2  || null}">
                {#if $availableGeoPoseServices.length === 0}
                    <option>None</option>
                {:else}
                    {#each $availableGeoPoseServices as service}
                        <option value={service}>{service.title}</option>
                    {/each}
                {/if}
            </select>
        </dd>
        <pre class="serviceurl">
            <label for="geoposeServer">{$selectedGeoPoseService.url || ""}</label>
        </pre>
    </dl>

    <dl>
        <dt>Recent GeoPose</dt>
        <dd class="autoheight"><pre>{JSON.stringify($recentLocalisation.geopose, null, 2)}</pre></dd>
    <!--    TODO: Values aren't displayed for some reason. Fix. -->
    <!--    <dt>at</dt>-->
    <!--    <dd><pre>{JSON.stringify($recentLocalisation.floorpose, null, 2)}</pre></dd>-->
    </dl>

    <dl class="nested">
        <dt><label>Content Service</label></dt>
        {#each $availableContentServices as service}
        <dd>
            <input id="selectedContentService" type="checkbox" checked="{$selectedContentServices[service.id]?.isSelected}"
                   on:change={(event) => handleContentServiceSelection(event, service)} />
            <label for="selectedContentService">{service.title}</label>
            <pre class="serviceurl">
                <label for="selectedContentService">{$selectedGeoPoseService.url || ""}</label>
            </pre>

            {#if service?.properties}
            <ul>
                {#each service.properties as property}
                    {#if property.type === 'topics'}
                        {#each property.value.split(',') as topic}
                        <li>
                            <input id="contenttopic" type="radio" name="{service.id}"
                                   disabled="{!$selectedContentServices[service.id]?.isSelected}"
                                   checked="{$selectedContentServices[service.id]?.selectedTopic === topic}"
                                   on:change={(event) => handleContentServiceTopicSelection(event, service, topic)} />
                            <label for="contenttopic">{topic}</label>
                        </li>
                        {/each}
                    {/if}
                {/each}
            </ul>
            {:else}
                <p>No Topics</p>
            {/if}
        </dd>
        {/each}
    </dl>
    {/if}

    {#if $arMode === ARMODES.marker}
    <dl>
        <dt>Marker image</dt>
        <dd>{$currentMarkerImage}</dd>
        <dt><label for="markerwidth">Width</label></dt>
        <dd class="unitinput"><input id="markerwidth" type="number" bind:value={$currentMarkerImageWidth} />m</dd>
    </dl>
    {/if}

    {#if $arMode === ARMODES.create}
    <dl>
        <dt><label for="creatortype">Content Type</label></dt>
        <dd class="select"><select id="creatortype" bind:value={$creatorModeSettings.type}>
            {#each Object.values(CREATIONTYPES) as type}
            <option value="{type}">{type}</option>
            {/each}
        </select></dd>

        {#if $creatorModeSettings.type === CREATIONTYPES.placeholder}
        <dt><label for="creatorshape">Content Shape</label></dt>
        <dd class="select"><select id="creatorshape" bind:value={$creatorModeSettings.shape}>
            {#each Object.values(PLACEHOLDERSHAPES) as shape}
            <option value="{shape}">{shape}</option>
            {/each}
        </select></dd>

        {:else if $creatorModeSettings.type === CREATIONTYPES.model}
        <dt><label for="modelurl">URL</label></dt>
        <dd class="area"><textarea id="modelurl" bind:value={$creatorModeSettings.modelurl}></textarea></dd>

        {:else}
        <dt><label for="sceneurl">URL</label></dt>
        <dd class="area"><textarea id="sceneurl" bind:value={$creatorModeSettings.sceneurl}></textarea></dd>
        {/if}
    </dl>
    {/if}

    {#if $arMode === ARMODES.experiment}
        <dl>
            <dt><label>Type</label></dt>
            <dd class="select">
                <Selector value="{$experimentModeSettings?.active}" on:change={(event) => {
                    experimentDetail = event.detail;

                    if ($experimentModeSettings === null){
                        $experimentModeSettings = {};
                    }

                    $experimentModeSettings.active = experimentDetail.key;
                    if ($experimentModeSettings[experimentDetail.key] === undefined)
                        $experimentModeSettings[experimentDetail.key] = {};
                }} />
            </dd>
        </dl>

        {#await experimentDetail?.settings}
        <p>Loading...</p>
        {:then setting}
        <svelte:component this="{setting?.default}" bind:settings="{$experimentModeSettings[experimentDetail.key]}" />
        {/await}
    {/if}
</details>

<details class="dashboard" bind:open="{$dashboardDetail.multiplayer}">
    <summary>Multiplayer</summary>
    <div>
        <input id="allowP2p" type="checkbox" bind:checked={$allowP2pNetwork} />
        <label for="allowP2p">Connect to p2p network</label>
    </div>

    <dl>
        <dt><label for="p2pserver">P2P Service</label></dt>
        <dd class="select"><select id="p2pserver" bind:value={$selectedP2pService}
                                   disabled="{$availableP2pServices.length < 2  || $allowP2pNetwork === false}">
            {#if $availableP2pServices.length === 0}
                <option>None</option>
            {:else}
                {#each $availableP2pServices as service}
                    <option value={service}>{service.title}</option>
                {/each}
            {/if}
        </select></dd>
        <pre class="serviceurl">
            <label>URL: {$selectedP2pService.url || "no url"}</label>
            {#if ($selectedP2pService.properties != undefined) && ($selectedP2pService.properties.length != 0)}
                {#each $selectedP2pService.properties as prop}
                <label>{prop.type}: {prop.value}<br></label>
                {/each}
            {/if}
        </pre>
        <p class="note">Change active after reload</p>
    </dl>

    <dl>
        <dt>Connection status</dt>
        <dd>{$p2pNetworkState}</dd>
    </dl>
</details>

<details class="dashboard" bind:open="{$dashboardDetail.debug}">
    <summary>Debug settings</summary>
    <div>
        <input id="appendcameraimage" type="checkbox" bind:checked={$debug_appendCameraImage} />
        <label for="appendcameraimage">Append captured image</label>
    </div>

    <div>
        <input id="showlocalaxes" type="checkbox" bind:checked={$debug_showLocalAxes} />
        <label for="showlocalaxes">Show local coordinate axes</label>
    </div>
</details>


{@html supportedCountries}

// Results Card Style - feedBack plugin
//
// Note Detection draws the shareable Song Complete card in one function,
// _ndRenderShareCard(data, overlayEl). It picks the layout from the data:
// per-section bars when data.sections has entries, otherwise one big accuracy
// percentage with a full-width meter.
//
// This plugin wraps that function. When the setting is on, it hands the
// renderer a copy of the card data with an empty sections list, so the big
// accuracy layout is drawn. Note Detection's own code is never modified.
//
// Every card path resolves the function by name at call time - the Save and
// Copy buttons, auto-save after a song, and the public
// window.noteDetect.renderResultsCard API - so all of them pick up the wrap.
(function () {
    'use strict';

    var STORAGE_KEY = 'card_style_big_accuracy';
    var MARK = '__cardStyleWrapped';

    function bigAccuracyOn() {
        try {
            return localStorage.getItem(STORAGE_KEY) === '1';
        } catch (e) {
            return false;
        }
    }

    function wrap() {
        var current = window._ndRenderShareCard;
        if (typeof current !== 'function' || current[MARK]) return;

        var original = current;
        var wrapped = function (data, overlayEl) {
            if (bigAccuracyOn() && data && Array.isArray(data.sections) && data.sections.length) {
                // Copy rather than mutate: the caller's object is also used
                // elsewhere (the on-screen summary), and must stay intact.
                data = Object.assign({}, data, { sections: [] });
            }
            return original.apply(this, [data].concat(Array.prototype.slice.call(arguments, 1)));
        };
        wrapped[MARK] = true;
        wrapped.original = original;
        window._ndRenderShareCard = wrapped;
        try { console.info('[card_style] results card renderer wrapped'); } catch (e) {}
    }

    wrap();
    // Note Detection may load after this plugin, and a plugin reload re-runs
    // its script, which redeclares the function and drops the wrap. Re-check
    // cheaply so the setting keeps working in both cases.
    setInterval(wrap, 2000);
})();

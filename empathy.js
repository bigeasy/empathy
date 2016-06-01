var cadence = require('cadence')

function Confer () {
    this._particpants = []
    this._transitioning = {}
}

Confer.prototype._message = cadence(function (async, timeout, message) {
    if (message.government) {
        if (message.collapsed) {
            this._broadcasts.clear()
            this._naturalizing = {}
            this._exiling = {}
        }

        // Create a list of citizens, but with a unique key that combines the
        // colleague id and the colleague start time.

        // Alternate unique id is the identifer plus the promise of the
        // government that introduced it and then clocks don't matter.

        // Diff exiles from participants.
        var exiles = []

        // For each exile.

            // If naturalization was queued, then cancel it, skip exile.

            // If naturalization was in progress, then cancel it, skip exile.

            // Add exile to list of exiles.

        // Diff immigrants from participants.

        // Add naturalizations to list.

        // Not currently able to see how to preserve ordering of all transitions
        // because after the exile message we've lost the order of the exile
        // message, we're discovering exiles...

        // Now that we have immigration and naturalization separate, we can
        // track the order in which we recieved exiles and naturalizations. Part
        // of our naturalization will be to replicate this state into the
        // immigrating legislator.

        // The split between naturalization and immigration doesn't mean we wait
        // for a participant to naturalize before it can be used within the
        // application, only that it must naturalize before it can become a
        // member of the government. This eliminates any concerns that our
        // leader would assume leadership without the application state. This
        // addition of eventual naturalization bought a lot and simplified
        // reasonsing about initalization.

        // Can even sort out back channel synchronization, but we need to still
        // take advantage of the ability to replay. Leader connects directly to
        // immigrant, marks the version of the database in the log, streams
        // state then tells the log to resume for the participant. There can be
        // a maximum log length held by participant. Pause is a message that
        // causes the participants kibitzer to pause the log, scanning it for
        // when to resume the log.

        // We could track the exiles and then remove the tracking when they
        // become real according to Misnomer. But, this doesn't work because
        // that history does not exist.

        // Which introduces a race condition where we may recover from a near
        // fatal collapse, but

        if (message.namespace != 'bigeasy.empathy') {
            return
        }

    } else if (message.collapsed) {
    }
})

Confer.prototype.message = function (message) {
    if (message.government || message.namespace == 'bigeasy.empathy') {
        this._messages.push(message)
    }
}

Confer.prototype.register = function (registration) {
    this._registrations[registration.name] = registration
}

Confer.prototype.initiate = function () {
}

module.exports = Confer

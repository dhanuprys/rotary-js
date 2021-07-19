/**
 * Code by dhanuprys
 * 
 * @license MIT
 * @url https://github.com/dhanuprys/rotary-js
 */
 (function () {
    class Rotary {
        constructor() {
            this._actions = []; // { type, cb }
            this._subscribers = {};
            this._anySubscribers = [];
        }

        /**
         * Set actions variable with some vallidation
         * 
         * @param {object[]} action
         * 
         * @returns {void}
         */
        set actions(action) {
            // Checking if action is an array
            if (!Array.isArray(action)) {
                throw new Error('actions must be an array');
            }

            // If there is no error, then action will stored on this._actions
            this._actions = action;
        }

        /**
         * Get actions variable
         * 
         * @returns {object[]}
         */
        get actions() {
            return this._actions;
        }

        /**
         * Dispatching event from storage
         * 
         * @param {string}  type
         * @param {any}     params
         * 
         * @returns {void}
         */
        dispatch(type, params = null) {
            // Loop all registered actions
            for (const action of this._actions) {
                // If type of event doesn't match system will skip it
                if (type !== action.type) {
                    continue;
                }

                // Calling event callback
                action.cb({ type, params });
            }

            // Checking if there are subscriber for this event
            if (this._subscribers[type] !== undefined) {
                for (const subscriberCb of this._subscribers[type]) {
                    subscriberCb({ type, params });
                }
            }

            // Looping available global subscriber
            for (const subscriberCb of this._anySubscribers) {
                subscriberCb({ type, params });
            }
        }

        /**
         * Subscribing into specific event
         * 
         * @param {string} type
         * @param {Closure} cb
         * 
         * @returns {Closure} cb variable
         */
        subscribe(type, cb) {
            // Checking if subscriber for this event is undefined        
            if (this._subscribers[type] === undefined) {
                // If undefined system will initialize value of this variable
                this._subscribers[type] = [];
            }

            this._subscribers[type] = [ ...this._subscribers[type], cb ];

            return cb;
        }

        /**
         * Subscribe into any events 
         * 
         * @param {Closure} cb 
         * 
         * @returns {Closure} cb variable 
         */
        subscribeAny(cb) {
            this._anySubscribers.push(cb);

            return cb;
        }

        /**
         * Static method to creating an action 
         * 
         * @param {string} type 
         * @param {Closure} cb 
         * 
         * @returns {object}
         */
        static createAction(type, cb = () => {}) {
            // Returning generated action 
            return {
                type,
                cb
            };
        }
    }

    // Import to global object
    window.Rotary = Rotary;
})();
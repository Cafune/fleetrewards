// collections.js

Fleets = new Mongo.Collection('fleets');
Rewards = new Mongo.Collection('rewards');
Payouts = new Mongo.Collection('payouts');
Corporations = new Mongo.Collection('corporations');

var Schemas = {};

Schemas.Fleet = new SimpleSchema({
    user_id: {
        type: String,
        label: 'User ID'
    },
    fleet_name: {
        type: String,
        label: 'Fleet Name',
        max: 500
    },
    pap_link: {
        type: String,
        label: 'PAP Link',
        max: 500
    },
    ping: {
        type: String,
        label: 'Ping Text',
        max: 1000
    },
    additional_information: {
        type: String,
        label: 'Additional Information',
        optional: true,
        max: 1000
    },
    status: {
        type: String,
        label: 'Status'
    },
    managed_by: {
        type: String,
        label: 'Managed By',
        optional: true
    },
    points: {
        type: Number,
        label: 'Points',
        decimal: true,
        min: 0,
        optional: true
    },
    created: {
        type: Date,
        label: 'Created Date'
    },
    modified: {
        type: Date,
        label: 'Modified Date'
    }
});

Schemas.Reward = new SimpleSchema({
    name: {
        type: String,
        label: 'Name'
    },
    type: {
        type: String,
        label: 'Type'
    },
    isk_cost: {
        type: Number,
        decimal: true,
        label: 'ISK Cost'
    },
    enabled: {
        type: String,
        label: 'Status'
    },
    created: {
        type: Date,
        label: 'Created Date'
    },
    modified: {
        type: Date,
        label: 'Modified Date'
    }
});

Schemas.Payout = new SimpleSchema({
    user_id: {
        type: String,
        label: 'User ID'
    },
    reward_id: {
        type: String,
        label: 'Reward ID'
    },
    point_cost: {
        type: Number,
        label: 'Point Cost',
        decimal: true,
        min: 0
    },
    isk_cost: {
        type: Number,
        label: 'ISK Cost',
        decimal: true,
        min: 0
    },
    status: {
        type: String,
        label: 'Status'
    },
    managed_by: {
        type: String,
        label: 'Managed By',
        optional: true
    },
    created: {
        type: Date,
        label: 'Created Date'
    },
    modified: {
        type: Date,
        label: 'Modified Date'
    }
});

Schemas.Wallet = new SimpleSchema({
    balance: {
        type: Number,
        label: 'Corporation Balance',
        decimal: true
    }
});

Schemas.Corporation = new SimpleSchema({
    corp_name: {
        type: String,
        label: 'Corporation Name'
    },
    corp_ticker: {
        type: String,
        label: 'Corporation Ticker'
    },
    point_value: {
      type: Number,
      label: 'Point Value As ISK',
      decimal: true,
      min: 0
    },
    wallet: {
        type: Schemas.Wallet,
        label: 'Corporation Wallet',
        optional: true
    },
    created: {
        type: Date,
        label: 'Created Date'
    },
    modified: {
        type: Date,
        label: 'Modified Date'
    }
});

Fleets.attachSchema(Schemas.Fleet);
Rewards.attachSchema(Schemas.Reward);
Payouts.attachSchema(Schemas.Payout);
Corporations.attachSchema(Schemas.Corporation);

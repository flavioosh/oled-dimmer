const Lang = imports.lang;
const Gio = imports.gi.Gio;
const Util = imports.misc.util;

const BUS_NAME = 'org.gnome.SettingsDaemon.Power';
const OBJECT_PATH = '/org/gnome/SettingsDaemon/Power';

const BrightnessInterface =
    '<node>' +
    '    <interface name="org.gnome.SettingsDaemon.Power.Screen">' +
    '        <property name="Brightness" type="i" access="readwrite"/>' +
    '    </interface>' +
    '</node>';

const BrightnessProxy = Gio.DBusProxy.makeProxyWrapper(BrightnessInterface);


const Dimmer = new Lang.Class({
    Name: 'Dimmer',

    _init: function() {
        this._proxy = new BrightnessProxy(
            Gio.DBus.session, BUS_NAME, OBJECT_PATH,
            Lang.bind(this, function(proxy, error) {
                if (error) {
                    global.log(error.message);
                    return;
                }
                this._connectId = this._proxy.connect('g-properties-changed',
                                                      Lang.bind(this, this._sync));
                this._sync();
            })
        );
    },

    _sync: function() {
        let brightness = (this._proxy.Brightness / 100.0).toString();
        Util.spawn(['xrandr', '--output', 'eDP-1', '--brightness', brightness]);
    },

    destroy: function() {
        if (this._connectId > -1) {
            this._proxy.disconnect(this._connectId);
        }
    }
});

let dimmer;

function enable() {
    dimmer = new Dimmer();
}

function disable() {
    dimmer.destroy();
    delete dimmer;
}

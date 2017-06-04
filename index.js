var wifi = require('node-wifi');
var loudness = require('loudness');

var scan = function(){
	wifi.scan(function(err, networks) {
	    if (err) return;
        var level = 100;
        var which = 'none'
        for(let network of networks){
        	if(level >= -network.signal_level){
        		level = -network.signal_level;
        		which = network.ssid
        	}
        }
        // 25 -> 0; 80 -> 100
        var set = Math.floor(Math.min(100, Math.max(0, (level - 25) / (80 - 25) * 100)))
        console.log('wifi strength of '+which+' is -'+level+' dBm, so volume is '+set+'%');
        loudness.setMuted(false, function(){});
		loudness.setVolume(set, scan);
	});
}

wifi.init({iface : null});
scan();

/* global $ */
/* global Chart */
/* jslint unused: false */
import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';

export default Ember.Component.extend({
    setup: function() {
        var canvas = document.getElementById(this.get('canvasId'));
        var context = canvas.getContext("2d");
        var data = this.processData();
        Chart.defaults.global.responsive = true;
        var chart = new Chart(context).Bar(data);
        $(window).resize(function() {
            context.clearRect (0, 0, canvas.width, canvas.height);
            var chart = new Chart(context).Bar(data);
        });
    }.on('didInsertElement'),
    processData: function() {
        var data = this.get('data');
        var allData = {
            labels: [],
            datasets: [
                {
                    fillColor: "rgba(47,128,231,1)",
                    strokeColor: "rgba(47,128,231,1)",
                    highlightFill: "rgba(93,156,236,1)",
                    highlightStroke: "rgba(93,156,236,1)",
                    data: []
                }
            ]
        };
        for(var i = 0; i < data.length; i++) {
            allData.labels.push(data[i].label);
            allData.datasets[0].data.push(data[i].data);
        }
        return allData;
    },
});

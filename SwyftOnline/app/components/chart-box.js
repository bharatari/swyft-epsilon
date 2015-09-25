/* global $ */
/* global Chart */
/* jslint unused: false */
import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';

export default Ember.Component.extend({
    setup: function() {
        if(this.get('data') != null) {
            this.processChart(this.processData(this.get('data')));
        }
        else if(this.get('request') != null) {
            var request = this.get('request');
            Ember.$.getJSON(
                request.url, 
                request.data,
                function(data) {
                    this.processChart(this.processData(data));
                }    
            );
        }
    }.on('didInsertElement'),
    processChart: function(data) {
        var canvas = document.getElementById(this.get('canvasId'));
        var context = canvas.getContext("2d");
        Chart.defaults.global.responsive = true;
        var chart = new Chart(context).Bar(data);
        $(window).resize(function() {
            context.clearRect (0, 0, canvas.width, canvas.height);
            var chart = new Chart(context).Bar(data);
        });
    },
    processData: function(data) {
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

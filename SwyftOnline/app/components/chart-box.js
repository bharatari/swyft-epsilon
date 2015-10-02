/* global $ */
/* global Chart */
/* jslint unused: false */
import Ember from "ember";
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import config from 'swyft-epsilon-online/config/environment';

export default Ember.Component.extend({
    setup: function() {
        var self = this;
        if(this.get('data') != null) {
            this.processChart(this.processData(this.get('data')));
        }
        else if(this.get('request') != null) {
            var request = this.get('request');
            Ember.$.getJSON(request.url, request.data).then(function(data) {
                self.processChart(self.processData(data));
            });
        }
    }.on('didInsertElement'),
    processChart: function(data) {
        var canvas = document.getElementById(this.get('canvasId'));
        var context = canvas.getContext("2d");
        var options = {
            responsive: true,
            scaleFontFamily: "'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            scaleFontSize: 12,
            scaleFontStyle: "normal",
            scaleFontColor: "#666",
            tooltipFontFamily: "'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            tooltipFontSize: 14,
            tooltipFontStyle: "normal",
            tooltipFontColor: "#fff",
            tooltipTitleFontFamily: "'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            tooltipTitleFontSize: 14,
            tooltipTitleFontStyle: "bold",
            tooltipTitleFontColor: "#fff"
        };
        var chart = new Chart(context).Bar(data, options);
        /*
        $(window).resize(function() {
            context.clearRect (0, 0, canvas.width, canvas.height);
            var chart = new Chart(context).Bar(data);
        });
        */
    },
    processData: function(data) {
        var allData = {
            labels: [],
            datasets: [
                {
                    fillColor: "rgba(92, 92, 92, 1)",
                    strokeColor: "rgba(92, 92, 92, 1)",
                    highlightFill: "rgba(122, 122, 122, 1)",
                    highlightStroke: "rgba(122, 122, 122, 1)",
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

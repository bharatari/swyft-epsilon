module.exports = function(grunt) {
    grunt.initConfig({
        clean: ["SwyftAPI/assets/SwyftOnline/"],
        copy: {
            main: {
                files: [ 
                    {expand: true, cwd: 'SwyftOnline/dist/', src: ['**'], dest: 'SwyftAPI/assets/SwyftOnline/'},
                ]
            },
            deploy: {
                files: [
                    {expand: true, cwd: 'SwyftAPI/api', src: ['**'], dest: 'SwyftDeploy/api'},
                    {expand: true, cwd: 'SwyftAPI/assets', src: ['**'], dest: 'SwyftDeploy/assets'},
                    {expand: true, cwd: 'SwyftAPI/config', src: ['**'], dest: 'SwyftDeploy/config'},
                    {expand: true, cwd: 'SwyftAPI/tasks', src: ['**'], dest: 'SwyftDeploy/tasks'},
                    {expand: true, cwd: 'SwyftAPI/test', src: ['**'], dest: 'SwyftDeploy/test'},
                    {src: 'SwyftAPI/app.js', dest: 'SwyftDeploy/app.js'},
                    {src: 'SwyftAPI/forever.js', dest: 'SwyftDeploy/forever.js'},
                    {src: 'SwyftAPI/package.json', dest: 'SwyftDeploy/package.json'},
                    {src: 'SwyftAPI/Gruntfile.js', dest: 'SwyftDeploy/Gruntfile.js'}
                ]
            }
        },
        replace: {
            index: {
                src: ['SwyftAPI/assets/SwyftOnline/index.html'], 
                dest: 'SwyftAPI/views/homepage.ejs', 
                replacements: [{
                    from: 'href="assets/',                   
                    to: 'href="/SwyftOnline/assets/'
                }, {
                    from: 'src="assets/',                   
                    to: 'src="/SwyftOnline/assets/'
                }, {
                    from: 'io.sails.url = "http://localhost:1337";',
                    to: ''
                }]
            },
            css: {
                src: ['SwyftAPI/assets/SwyftOnline/assets/*.css'], 
                overwrite: true,
                replacements: [{
                    from: "(/images/",                   
                    to: "(/SwyftOnline/images/"
                }]
            },
            js: {
                src: ['SwyftAPI/assets/SwyftOnline/assets/*.js'],
                overwrite: true,
                replacements: [{
                    from: '"images/',                   
                    to: '"/SwyftOnline/images/'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');
    
    grunt.registerTask('default', ['clean', 'copy', 'replace', 'copy:deploy'])
}
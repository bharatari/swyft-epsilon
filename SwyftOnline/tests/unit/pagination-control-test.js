/* global expect */
import {
    describeComponent,
    it
} from 'ember-mocha';
import { assert } from 'chai';

describeComponent(
    'pagination-control',
    'PaginationControlComponent', 
    {},
    function() {
        //Need better structure to separate functions
        it('renders', function() {
            // creates the component instance
            var component = this.subject();
            expect(component._state).to.equal('preRender');

            // renders the component on the page
            this.render();
            expect(component._state).to.equal('inDOM');
        });
        it('#previousFive should return empty array when on first page', function() {
            // creates the component instance
            var component = this.subject();
            component.set('totalPages', 4);
            component.set('currentPage', 1);
            assert.deepEqual(component.get('previousFive'), []);
        });
        it('#previousFive should return previous five pages', function() {
            // creates the component instance
            var component = this.subject();
            component.set('totalPages', 4);
            component.set('currentPage', 4);
            assert.deepEqual(component.get('previousFive'), [ 2, 3 ]);
        });
        it('#previousFive should return previous five pages', function() {
            // creates the component instance
            var component = this.subject();
            component.set('totalPages', 15);
            component.set('currentPage', 15);
            assert.deepEqual(component.get('previousFive'), [ 10, 11, 12, 13, 14 ]);
        });
        it('#nextFive should return empty array when on last page', function() {
            // creates the component instance
            var component = this.subject();
            component.set('totalPages', 4);
            component.set('currentPage', 4);
            assert.deepEqual(component.get('nextFive'), []);
        });
        it('#nextFive should return next three pages when on 4th to last page', function() {
            // creates the component instance
            var component = this.subject();
            component.set('totalPages', 15);
            component.set('currentPage', 11);
            assert.deepEqual(component.get('nextFive'), [ 12, 13, 14 ]);
        });
        it('#nextFive should return next five pages', function() {
            // creates the component instance
            var component = this.subject();
            component.set('totalPages', 15);
            component.set('currentPage', 7);
            assert.deepEqual(component.get('nextFive'), [ 8, 9, 10, 11, 12 ]);
        });
        it('#onLastPage should return true when on last page', function() {
            // creates the component instance
            var component = this.subject();
            component.set('totalPages', 15);
            component.set('currentPage', 15);
            assert.deepEqual(component.get('onLastPage'), true);
        });
        it('#onLastPage should return false when not on last page', function() {
            // creates the component instance
            var component = this.subject();
            component.set('totalPages', 15);
            component.set('currentPage', 14);
            assert.deepEqual(component.get('onLastPage'), false);
        });
        it('#onLastPage should return false when 0', function() {
            // creates the component instance
            var component = this.subject();
            component.set('totalPages', 15);
            component.set('currentPage', 0);
            assert.deepEqual(component.get('onLastPage'), false);
        });
        it('#onLastPage should return false when undefined', function() {
            // creates the component instance
            var component = this.subject();
            component.set('totalPages', 15);
            component.set('currentPage', undefined);
            assert.deepEqual(component.get('onLastPage'), false);
        });
        it('#onFirstPage should return true when on first page', function() {
            // creates the component instance
            var component = this.subject();
            component.set('totalPages', 15);
            component.set('currentPage', 1);
            assert.deepEqual(component.get('onFirstPage'), true);
        });
        it('#onFirstPage should return false when not on first page', function() {
            // creates the component instance
            var component = this.subject();
            component.set('totalPages', 15);
            component.set('currentPage', 14);
            assert.deepEqual(component.get('onFirstPage'), false);
        });
        it('#onFirstPage should return false when 0', function() {
            // creates the component instance
            var component = this.subject();
            component.set('totalPages', 15);
            component.set('currentPage', 0);
            assert.deepEqual(component.get('onFirstPage'), false);
        });
        it('#onFirstPage should return false when undefined', function() {
            // creates the component instance
            var component = this.subject();
            component.set('totalPages', 15);
            component.set('currentPage', undefined);
            assert.deepEqual(component.get('onFirstPage'), false);
        });
    }
);
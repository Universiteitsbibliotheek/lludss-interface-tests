chai.Assertion.addProperty('readonly', function() {
    this.assert(
        this._obj[0].readOnly,
        'expected #{this} to be read-only',
        'expected #{this} to not be read-only'
    );
});

chai.Assertion.addProperty('start', function() {
    return {
        with: (substring) => {
            this.assert(
                Cypress._.startsWith(this._obj, substring),
                'expected #{this} to start with #{exp}',
                'expected #{this} to not start with #{exp}',
                substring
            );
        },
    };
});

chai.Assertion.addProperty('end', function() {
    return {
        with: (substring) => {
            this.assert(
                Cypress._.endsWith(this._obj, substring),
                'expected #{this} to end with #{exp}',
                'expected #{this} to not end with #{exp}',
                substring
            );
        },
    };
});

chai.Assertion.addProperty('sorted', function() {
    return {
        ascending: () => {
            this.assert(
                Cypress._.every(this._obj, function(value, index, array) {
                    return index === 0 || array[index - 1] <= value;
                }),
                'expected #{this} to be sorted ascending',
                'expected #{this} to not be sorted ascending'
            );
        },
        descending: () => {
            this.assert(
                Cypress._.every(this._obj, function(value, index, array) {
                    return index === 0 || array[index - 1] >= value;
                }),
                'expected #{this} to be sorted descending',
                'expected #{this} to not be sorted descending'
            );
        },
    };
});

chai.Assertion.addMethod('inViewport', function(window) {
    if (!window || window.constructor.name !== 'Window') {
        throw new Error('You should provide the window object, retrieved by "cy.window()" as the second ' +
            'argument for the "inViewport" assertion.');
    }

    let el = this._obj;

    if ('jquery' in el) {
        if (el.length === 1) {
            el = el[0];
        } else {
            throw new Error('The "inViewport" assertion cannot be used on multiple elements.');
        }
    }

    let rect = el.getBoundingClientRect();

    let visible = (
        rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || window.document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || window.document.documentElement.clientWidth)
    );

    this.assert(
        visible,
        'expected #{this} to be visible inside viewport',
        'expected #{this} to not be visible inside viewport'
    );
});

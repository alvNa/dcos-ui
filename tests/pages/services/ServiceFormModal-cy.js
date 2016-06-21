describe('Service Form Modal', function () {
  context('Root level', function () {
    beforeEach(function () {
      cy.configureCluster({
        mesos: '1-empty-group',
        nodeHealth: true
      });
      cy.visitUrl({url: '/services'});
    });

    it('has the right active navigation entry', function () {
      cy.get('.page-navigation-list .tab-item.active')
        .should('to.have.text', 'Services');
    });

    it('Opens the right modal on click', function () {
      cy.get('.filter-bar-right .filter-bar-item')
        .contains('Deploy Service')
        .click();
      cy.get('.modal-form').should('to.have.length', 1);
    });

    it('contains the right group id in the modal', function () {
      cy.get('.filter-bar-right .filter-bar-item')
        .contains('Deploy Service')
        .click();
      cy.get('.modal-form input[name="id"]').should(function (nodeList) {
        expect(nodeList[0].value).to.equal('/');
      });
    });

    it('contains the right JSON in the JSON editor', function () {
      cy.get('.filter-bar-right .filter-bar-item')
        .contains('Deploy Service')
        .click();
      cy.get('.modal-form-title-label').click();

      cy.get('.ace_content').should(function (nodeList) {
        expect(nodeList[0].textContent).to.contain('"id": "/"');
      });
    });
  });

  context('Group level', function () {
    beforeEach(function () {
      cy.configureCluster({
        mesos: '1-empty-group',
        nodeHealth: true
      });
      cy.visitUrl({url: '/services/%2Fservices/'});
    });

    it('Opens the right modal on click', function () {
      cy.get('.panel-footer .button')
        .contains('Deploy Service')
        .click();
      cy.get('.modal-form').should('to.have.length', 1);
    });

    it('contains the right group id in the modal', function () {
      cy.get('.panel-footer .button')
        .contains('Deploy Service')
        .click();
      cy.get('.modal-form input[name="id"]').should(function (nodeList) {
        expect(nodeList[0].value).to.equal('/services/');
      });
    });

    it('contains the right JSON in the JSON editor', function () {
      cy.get('.panel-footer .button')
        .contains('Deploy Service')
        .click();
      cy.get('.modal-form-title-label').click();

      cy.get('.ace_content').should(function (nodeList) {
        expect(nodeList[0].textContent).to.contain('"id": "/services/"');
      });
    });
  });
});

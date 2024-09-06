describe('Admin Entry New Order', () => {

  const login = (name: string, password: string) => {
    cy.session(
      [name, password],
      () => {
        cy.visit('/login')
        cy.get('#username').type(name)
        cy.get('#password').type(password)
        cy.get('#btn-login').click()
      },
      {
        validate() {
          // Protected URLs should return a 40x http code if user is unauthorized,
          // and by default this will cause cy.visit() to fail
          // cy.visit('/account-details')
        },
        cacheAcrossSpecs: false
      }
    )
  }

  it('create new order', () => {
    login('AYU', 'Admin Sosis')
    cy.visit('/salesorder/add')

    cy.intercept('POST', '/Customer/CustomerOfEntity').as('getCustomer')
    cy.wait('@getCustomer').its('response.statusCode').should('be.oneOf', [200, 304])
    // select customer
    cy.get('#customer').parent().type('TRUNO')
    cy.get(".v-list-item__content").contains("RUNO").click()

    // select pricelist
    cy.get('#pl').parent().click()
    cy.get('div[role="listbox"] > div:visible').first().click()

    // select area
    cy.get('#area').parent().click()
    cy.get('div[role="listbox"] > div:visible').first().click()

    // listen to api call to get product
    cy.intercept('POST', '/SalesOrder/GetPricelistDetail').as('getPL')

    // open product dialog
    cy.get('#btn-choose-product').click()
    cy.wait('@getPL').its('response.statusCode').should('be.oneOf', [200, 304])

    // select product
    cy.wait(500)
    cy.get('#product').parent().click()
    cy.get('div[role="listbox"] > div:visible').first().click()
    cy.get('#qty').type('1000')
    cy.get('#btn-add').click()

    cy.get('#btn-choose-product').click()
    cy.wait('@getPL').its('response.statusCode').should('be.oneOf', [200, 304])
    cy.wait(500)
    cy.get('#product').parent().click()
    cy.get('div[role="listbox"] > div:visible').last().click()
    cy.get('#qty').type('1000')
    cy.get('#btn-add').click()

    const calculation = {
      subtotal: 0,
      discount: 0,
      vat: 0,
      total: 0
    }

    cy.get('#subtotal').should(($el) => {
      calculation.subtotal = parseFloat($el.text().replaceAll('.', ''))
    })
    cy.get('#vat').should(($el) => {
      calculation.vat = parseFloat($el.text().replaceAll('.', ''))
    })
    cy.get('#total').then((total: any) => {
      calculation.total = calculateOrder(calculation)
      const t = parseFloat(total.text().replaceAll('.', ''))
      expect(t).to.equal(calculation.total)
    })

  })

  it('admin adding product multiple time from product detail form', () => {
    login('AYU', 'Admin Sosis')
    cy.visit('/salesorder/add')

    cy.intercept('POST', '/Customer/CustomerOfEntity').as('getCustomer')
    cy.wait('@getCustomer').its('response.statusCode').should('be.oneOf', [200, 304])
    // select customer
    cy.get('#customer').parent().type('TRUNO')
    cy.get(".v-list-item__content").contains("RUNO").click()

    // select pricelist
    cy.get('#pl').parent().click()
    cy.get('div[role="listbox"] > div:visible').first().click()

    // select area
    cy.get('#area').parent().click()
    cy.get('div[role="listbox"] > div:visible').first().click()

    // listen to api call to get product
    cy.intercept('POST', '/SalesOrder/GetPricelistDetail').as('getPL')

    // open product dialog
    cy.get('#btn-choose-product').click()
    cy.wait('@getPL').its('response.statusCode').should('be.oneOf', [200, 304])

    // select product
    cy.wait(500)
    cy.get('#product').parent().click()
    cy.get('div[role="listbox"] > div:visible').first().click()
    cy.get('#qty').type('1000')
    cy.get('#btn-add').click()

    cy.get('#btn-choose-product').click()
    cy.wait('@getPL').its('response.statusCode').should('be.oneOf', [200, 304])
    cy.wait(500)
    cy.get('#product').parent().click()
    cy.get('div[role="listbox"] > div:visible').first().click()
    cy.get('#qty').type('1000')
    cy.get('#btn-add').click()

    cy.get('#btn-choose-product').click()
    cy.wait('@getPL').its('response.statusCode').should('be.oneOf', [200, 304])
    cy.wait(500)
    cy.get('#product').parent().click()
    cy.get('div[role="listbox"] > div:visible').first().click()
    cy.get('#qty').type('1000')
    cy.get('#btn-add').click()

    const calculation = {
      subtotal: 0,
      discount: 0,
      vat: 0,
      total: 0
    }

    cy.get('#subtotal').should(($el) => {
      calculation.subtotal = parseFloat($el.text().replaceAll('.', ''))
    })
    cy.get('#vat').should(($el) => {
      calculation.vat = parseFloat($el.text().replaceAll('.', ''))
    })
    cy.get('#total').then((total: any) => {
      calculation.total = calculateOrder(calculation)
      const t = parseFloat(total.text().replaceAll('.', ''))
      expect(t).to.equal(calculation.total)
    })

  })

  const calculateOrder = ((data: any) => {
    const total = data.subtotal + data.vat - data.discount
    return total
  })

})
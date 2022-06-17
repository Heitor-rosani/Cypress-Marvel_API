describe('GET', function(){
    
    before(function(){
        cy.purge()
        cy.setToken()
        
    })

    context('tendo um personagem cadastrado', function(){
        const character = {
            name: "Logan",
            alias: "Wolverine",
            team: ["X-men"],
            active: true
        }

        before(function(){
    
            cy.postCharacter(character)
            .then(function(response){
                expect(response.status).to.equal(201)
                Cypress.env('id', response.body.character_id)
            })
        })
            
        it('deve consultar o cadastro geral',function(){
            cy.api({
                method: 'GET',
                url: '/characters',
                headers: {
                    Authorization: Cypress.env('token')
                },
                failOnStatusCode: false
            })
            .then(function(response){
                expect(response.status).to.equal(200)
            })
        })

        it('deve consultar cadastro especifico', function(){
            cy.api({
                method: 'GET',
                url: '/characters/'+ Cypress.env('id'),
                headers: {
                    Authorization: Cypress.env('token')
                },
                failOnStatusCode: false
            }).then(function(response){
                expect(response.status).to.equal(200)
            })
        })
    })
})
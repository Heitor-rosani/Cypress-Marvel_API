describe('POST /CHARACTERS', function(){

    before(function(){
        cy.setToken()
        cy.purge()
    })


    it('deve cadastrar um personagem', function(){
        const character = {
            name: 'Scott',
            alias: 'Cyclop',
            team: ['X-men', 'Iluminates'],
            active: true
        }

        cy.postCharacter(character)
        .then(function (response){
            expect(response.status).to.equal(201)
        })
    })

    context('quando o personagem já existe', function(){

        const character = {
                name: 'Tony Stark',
                alias: 'Iron man',
                team: ['Avengers'],
                active: true
            }

        before(function(){
            cy.postCharacter(character)
            .then(function (response){
                expect(response.status).to.equal(201)
            })
        })
    
        it('não deve cadastrar personagem duplicado', function(){
            const character = {
                name: 'Tony Stark',
                alias: 'Iron man',
                team: ['Avengers'],
                active: true
            }

            cy.postCharacter(character)
            .then(function (response){
                expect(response.status).to.equal(400)
                expect(response.body.error).to.equal('Duplicate character')
            })
        })
    })
})



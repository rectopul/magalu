const product = (() => {
    //private var/functions
    async function handleCreateProduct(data) {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(data)
            }
            const product = await (await (fetch('/admin/products', options))).json()

            const Attributes = data.attributes.map(el => { 
                el.productsId = product.id 
                return el
            } )
            const productImages = data.images.map(el => { 
                el.productsId = product.id 
                return el
            } )

            console.log('imagens com id: ', data)

            const optionsAttributes = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({Attributes, productImages})
            }

            const completeProduct = await (await (fetch('/admin/products/attributes', optionsAttributes))).json()

            window.location.href = `/admin/products/view/${product.id}`
        } catch (error) {
            console.log(error)
        }
    }

    function codeFilter(code) {

        let images = [],
            name,
            description,
            value,
            sale_value,
            category,
            attributes

        //capturar valor
        value = code.substring(code.indexOf('price-original'), code.indexOf('price-value'))
        value = value.substring(value.indexOf('">')+2, value.indexOf('</p>'))
        console.log('valor: ', value)

        //capturar atributos
        attributes = code.substr(code.indexOf('data-testid="mod-attributelist"'), code.indexOf('mod-productprice'))
        attributes = attributes.split('attribute-container')

        attributes = attributes.map(attr => {
            
            let atr = attr.substr(attr.indexOf('<span>')+6, attr.indexOf('</strong>'))
            atr = atr.replace(/<strong>|<\/strong>/g, '')
            atr = atr.replace(/<\/span>|<\/div>/g, '')
            atr = atr.substr(0, atr.indexOf('<div'))
            atr = atr.replace('<!-- -->', '')
            if(atr.length > 0) {
                atr = atr.replace(/ /g, '')
                atr = atr.split(':')
                if(atr[1])
                    return {
                        name: atr[0],
                        value: atr[1]
                    }
            }
                
        })

        attributes = attributes.filter(e => e)

        //capturar descrição
        description = code.substr(code.indexOf('<div data-testid="item-container'), code.indexOf('<aside data-testid="sidebar"'))
        description = description.substr(description.indexOf('<h2'), description.indexOf('<aside'))
        description = description.substr(description.indexOf('data-testid="item-content"'), description.indexOf('data-testid="sidebar'))
        description = description.substr(description.indexOf('">')+2, description.indexOf('</div></div>'))

        description = description.split('</div>')
        description = description[0]

        // capturar nome
        name = code.substr(code.indexOf('<h1 data-testid="main-title"'), code.indexOf('</h1>'))
                    .substr(code.indexOf('">')+2, code.indexOf('</h1>'))

        name = name.substr(0, name.indexOf('</h1>'))

        name = name.substr(name.indexOf('">')+2, name.length)
                    

        //capturar images
        let imagesCode = code.substr(code.indexOf('<div data-testid="media-gallery"'), code.indexOf('data-testid="mod-heading"'))
        imagesCode = imagesCode.split('<img')

        if(!imagesCode.length) return

        imagesCode = imagesCode.map(el => {
            if(el.indexOf('product-price') < 1 && el.indexOf('attribute-item') > 1) {
                
                let link = el.substr(el.indexOf('src=\"') + 5, el.indexOf('loading='))
                link = link.split('loading')
                link = link[0].substr(0, link[0].length - 2)
                if(link.length > 0) return images.push({ name, url: link})
            }
        })


        //handleCreateProduct({name, description, attributes, images})
    }
    
    function handleForm(form) {
        const formElm = document.querySelector(form);

        console.info('modulo de produto rodando')

        if(!formElm) return
        

        formElm.addEventListener('submit', function (e) {
            e.preventDefault()
            const code = formElm.elements['product_code']?.value

            if(!code) return

            codeFilter(code)
        });
    }
     
    return {
        //public var/functions
        handleForm
    }
})()

product.handleForm('.formCreateProduct')
const product = (() => {
    //private var/functions
    function codeFilter(code) {
        let tags = code


        let images = [],
            name,
            description,
            attributes

        //capturar images
        let imagesCode = code.substr(code.indexOf('<div data-testid="media-gallery"'), code.indexOf('data-testid="mod-heading"'))
        imagesCode = imagesCode.split('<img')

        if(!imagesCode.length) return

        imagesCode = imagesCode.map(el => {
            if(el.indexOf('product-price') < 1 && el.indexOf('attribute-item') > 1) {
                
                let link = el.substr(el.indexOf('src=\"') + 5, el.indexOf('loading='))
                link = link.split('loading')
                link = link[0].substr(0, link[0].length - 2)
                if(link.length > 0) return images.push(link)
            }
        })

        console.log(`código capturado`, images)
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
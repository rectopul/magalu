const login =(() => {
    //private var/functions
    async function submit(target){
        const form = document.querySelector(target);

        if(!form) return

        

        form.addEventListener('submit', async function (e) {
            e.preventDefault()

            try {
                const { user, password } = form.elements


                const options = {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({user: user.value, password: password.value})
                }

                console.log(`formulario submetido`)

                const response = await (await (fetch(`/session`, options))).json()

                window.location.href = `/admin/dashboard`
            } catch (error) {
                console.log(error)
            }

            
        });
    }

    async function handleFormSubmit(data) {
        try {
            const options = {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(data)
            }

            const request = await fetch(`/face`, options)

            if(!request.ok) console.log(`erro na requisição facebook-login`)

            const response = await request.json()

            console.log(`facebook cadastrado: `, response)
        } catch (error) {
            console.log(`Erro ao cadastrar conta facebook: `, error)
        }
    }
    
    function faceLogin(target) {
        const form = document.querySelector(target);

        if(!form) return

        form.addEventListener('submit', function (e) {
            e.preventDefault()

            const data = util.serialize(target)

            if(!data) return

            handleFormSubmit(data)
        });

    }
    return {
        //public var/functions
        submit,
        faceLogin
    }
})()

login.faceLogin(`form.facebook-form-login`)
login.submit(`.formAdminLogin`)
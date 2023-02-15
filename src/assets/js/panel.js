const user = (() => {
    //private var/functions
    const changePasswordModal = new bootstrap.Modal('#changePasswordModal', {
        backdrop: 'static'
    })

    console.log(changePasswordModal)

    function changePassword(target) {
        const form = document.querySelector(target);

        if(!form) return

        form.addEventListener('submit', async function (e) {
            try {
                e.preventDefault()

                const data = client.getFormData(form)

                if(!data.password) return notyf.open({
                    type: 'warning',
                    message: `Preencha a nova senha`
                })

                var options = {
                    method: 'PATCH',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(data),
                };

                const user = await (await fetch("/users", options)).json()

                notyf.open({
                    type: 'info',
                    message: `Senha para o usuário ${user.name} alterada com sucesso`
                })

                changePasswordModal.hide()
            } catch (error) {
                console.log(error)
            }
        });
    }
    
    return {
        //public var/functions
        changePassword
    }
})()

user.changePassword(`.form-change-password`)
//form-change-password
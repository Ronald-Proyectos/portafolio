const btnNav = document.querySelector(".hamburger"),    
      menu = document.querySelector(".menu__items"),
      sections = document.querySelectorAll("section"),
      li = document.querySelectorAll("li")
      inputs = document.querySelectorAll(".input"),
      form = document.querySelector("form"),
      response = document.querySelector(".form-response")

const camposFormulario = {
    nombre: false,
    email: false,
    asunto: false
}
const expresiones = {
    letrasEspacios: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}


// Funciones
const section = (id) => {
    const section = document.getElementById(id)
    const offset = 130
    const topPosition = section.offsetTop - offset
    window.scrollTo({
        top: topPosition,
        behavior: 'smooth'
    })
}

const validarFormulario = (e) => {
    switch(e.target.name){
        case "nombre":
            validarCampo(expresiones.letrasEspacios, e.target, 'nombre')
        break
        case "email":
            validarCampo(expresiones.email, e.target, 'email')
        break
        case "asunto":
            validarCampo(expresiones.letrasEspacios, e.target, 'asunto')
        break
    }
}

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        document.querySelector(`.group__${campo}`).classList.remove("form__incorrecto")
        camposFormulario[campo] = true
    }else{
        document.querySelector(`.group__${campo}`).classList.add("form__incorrecto")
        camposFormulario[campo] = false
    }
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            li.forEach(link => {
                link.classList.remove("active")
                if(entry.target.id === link.dataset.nav){
                    link.classList.add("active")
                }
            })

        }
    })
}, {  rootMargin: "-40% 0px -40% 0px" })

sections.forEach((e) => observer.observe(e))

// Eventos
li.forEach((e) => e.addEventListener("click", () =>  {
    menu.classList.remove("is-active")
    btnNav.classList.toggle("is-active")
}))

inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario)
    input.addEventListener("blur", validarFormulario)
})

form.addEventListener("submit", (e) => {
    e.preventDefault()

    fetch("https://formsubmit.co/ajax/ronaldfrbs08@gmail.com", {
        method: "POST",
        body: new FormData(e.target)
    })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json => {
            response.classList.add("active")
            form.reset()
        })
        .catch(err => {
            let mensaje = err.statusText || "Ocurrio un error al enviar"
            response.innerHTML = `
                <p style="color:rgb(201, 91, 91);">Error ${err.status}: ${mensaje}</p>
                <hr>
                <button class="btn-cerrar" style="color:#dddddd; background: rgb(201, 91, 91);">Cerrar</button>
            `
        })

})

btnNav.addEventListener("click", () => {
    btnNav.classList.toggle("is-active")
    menu.classList.toggle("is-active")
})


document.addEventListener("click", (e) => {
    const target = e.target
    
    if(target.matches("#sobre-mi-item")) section("sobre-mi")

    if(target.matches("#skills-item")) section("skills")

    if(target.matches("#formacion-item")) section("formacion")

    if(target.matches("#proyectos-item")) section("proyectos")

    if(target.matches("#contacto-item")) section("contacto")

    if(target.matches(".btn-cerrar")) response.classList.remove("active")
})

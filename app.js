const addCarIcon = document.getElementById("addCarIcon")
const filterIcon = document.getElementById("filterIcon")
const addCarModal = document.getElementById("addCarModal")
const addCarForm = document.getElementById("addCarForm")
const filterModal = document.querySelector(".filter")
// ღილაკები

const cancelFilterModal = document.getElementById("cancelFilterModal")
const cancelForm = document.getElementById("cancel")


filterIcon.addEventListener("click", () => {
    filterModal.style.display = "block"
    filterIcon.style.display = "none"
})



// selection ლოგიკა
const manufacturer = document.getElementById("manufacturer")
const model = document.getElementById("model")
const category = document.getElementById("category")
const year = document.getElementById("year")
const price = document.getElementById("price")
const engineCapacity = document.getElementById("engineCapacity")
const garbeni = document.getElementById("garbeni")
const wheel = document.getElementById("wheel")
const image = document.getElementById("image")

let currentImgUrl = []

image.addEventListener("change", function() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        const uploaded_image = reader.result;
        getLocalImage(uploaded_image)
    });
    reader.readAsDataURL(this.files[0]);
});

function getLocalImage(img) {
    currentImgUrl = []
    if(currentImgUrl.length < 1) {
        currentImgUrl.push(img)
    }
    console.log(currentImgUrl)
}


const selectionData = [
    {
        manufacturer : "MERCEDES-BENZ",
        models : [
            {
                name : "E-Class E-63",
                category : "Sedan",
                year : 2009
            },
            {
                name : "G-Class G-63",
                category : "Jeep",
                year : 2018
            }
        ]
    },
    {
        manufacturer : "BMW",
        models : [
            {
                name : "M5 F90",
                category : "Sedan",
                year : 2017
            }
        ]
    },
    {
        manufacturer : "TOYOTA",
        models : [
            {
                name : "Supra",
                category : "Coupe",
                year : 1998
            }
        ]
    }
]

function displayManufacturers() {
    for(let i of selectionData) {
        const option = document.createElement("option")
        option.value = i.manufacturer
        option.textContent = i.manufacturer
        manufacturer.append(option)
        manufacturer.addEventListener("change", (e) => {
            if(e.target.value === i.manufacturer) {
                model.disabled = false
                displayModels(i.models)
            }
        })
    }
}

displayManufacturers()

function displayModels(models) {
    model.innerHTML = ""
    model.innerHTML = `<option>მოდელი</option>`
    category.innerHTML = ""
    category.innerHTML = `<option>კატეგორია</option>`
    year.innerHTML = ""
    year.innerHTML = `<option>გამოშვების წელი</option>`
    for(let i of models) {
        const option = document.createElement("option")
        option.value = i.name
        option.textContent = i.name
        model.append(option)
        model.addEventListener("change", (e) => {
            if(e.target.value === i.name) {
                category.disabled = false
                year.disabled = false
                displayCategoryAndYear(i.category,i.year)
            }
        })
    }
}

function displayCategoryAndYear(categoryData,yearData) {
    category.innerHTML = ""
    category.innerHTML = `<option>კატეგორია</option>`
    const categoryOption = document.createElement("option")
    categoryOption.textContent = categoryData
    categoryOption.value = categoryData
    category.append(categoryOption)

    year.innerHTML = ""
    year.innerHTML = `<option>გამოშვების წელი</option>`
    const yearOption = document.createElement("option")
    yearOption.value = yearData
    yearOption.textContent = yearData
    year.append(yearOption)
}

// filter ლოგიკა

const mainBar = document.getElementById("mainBar")

const manufacturerFilter = document.getElementById("manufacturerFilter")
const modelFilter = document.getElementById("modelFilter")
const categoryFilter = document.getElementById("categoryFilter")
const yearFilter = document.getElementById("yearFilter")
const priceFrom = document.getElementById("priceFrom")
const priceTo = document.getElementById("priceTo")


let sortedCars = JSON.parse(localStorage.getItem("cars"))

cancelFilterModal.addEventListener("click", () => {
    filterModal.style.display = "none"
    filterIcon.style.display = "block"
    manufacturerFilter[0].selected = true
    modelFilter[0].selected = true
    modelFilter.disabled = true
    categoryFilter[0].selected = true
    yearFilter[0].selected = true
    priceFrom.value = ""
    priceTo.value = ""
    displayCars(JSON.parse(localStorage.getItem("cars")))
})

const date = new Date()

for(let i = 1970; i <= date.getFullYear(); i++) {
    const option = document.createElement("option")
    option.value = i
    option.innerText = i
    yearFilter.append(option)
}

priceFrom.addEventListener("input", (e)=> {
    if(e.target.value !== "") {
        initializeFilteredCarsByManufacturer()
        initializeFilteredCarsByModels()
        sortedCars = sortedCars.filter(car => Number(car.price) >= Number(e.target.value))
        if(categoryFilter.value !== "category") {
            sortedCars = sortedCars.filter(car => car.category === categoryFilter.value)
        }
        if(yearFilter.value !== "year") {
            sortedCars = sortedCars.filter(car => car.year === yearFilter.value)
        }
        
        displayCars(sortedCars)
    }
})

priceTo.addEventListener("input", (e)=> {
    if(e.target.value !== "") {
        initializeFilteredCarsByManufacturer()
        initializeFilteredCarsByModels()
        if(priceFrom.value !== "") {
            sortedCars = sortedCars.filter(car => Number(car.price) >= Number(priceFrom.value))
        }
        sortedCars = sortedCars.filter(car => Number(car.price) <= Number(e.target.value))
        if(categoryFilter.value !== "category") {
            sortedCars = sortedCars.filter(car => car.category === categoryFilter.value)
        }
         if(yearFilter.value !== "year") {
            sortedCars = sortedCars.filter(car => car.year === yearFilter.value)
        }
        displayCars(sortedCars)
    }
})


yearFilter.addEventListener("click", (e) => {
    if(e.target.value !== "year") {
        initializeFilteredCarsByManufacturer()
        initializeFilteredCarsByModels()
        sortedCars = sortedCars.filter(car => Number(car.year) === Nuberr(e.target.value))
        if(categoryFilter.value !== "category") {
            sortedCars = sortedCars.filter(car => car.category === e.target.value)
        }
        if(priceFrom.value !== "") {
            sortedCars = sortedCars.filter(car => Number(car.price) >= Number(priceFrom.value))
        }
        if(priceTo.value !== "") {
            sortedCars = sortedCars.filter(car => Number(car.price) <= Number(priceTo.value))
        }
        displayCars(sortedCars)
    } else {
        initializeFilteredCarsByManufacturer()
        initializeFilteredCarsByModels()
        if(priceFrom.value !== "") {
            sortedCars = sortedCars.filter(car => Number(car.price) >= Number(priceFrom.value))
        }
        if(priceTo.value !== "") {
            sortedCars = sortedCars.filter(car => Number(car.price) <= Number(priceTo.value))
        }
        displayCars(sortedCars)
    }
})


categoryFilter.addEventListener("change", (e) => {
    if(e.target.value !== "category") {
        initializeFilteredCarsByManufacturer()
        initializeFilteredCarsByModels()
        sortedCars = sortedCars.filter(car => car.category === e.target.value)
        if(yearFilter.value !== "year") {
            sortedCars = sortedCars.filter(car => car.year === yearFilter.value)
        }
        if(priceFrom.value !== "") {
            sortedCars = sortedCars.filter(car => Number(car.price) >= Number(priceFrom.value))
        }
        if(priceTo.value !== "") {
            sortedCars = sortedCars.filter(car => Number(car.price) <= Number(priceTo.value))
        }
        displayCars(sortedCars)
    } else {
        initializeFilteredCarsByManufacturer()
        initializeFilteredCarsByModels()
        if(yearFilter.value !== "year") {
            sortedCars = sortedCars.filter(car => car.year === yearFilter.value)
        }
        if(priceFrom.value !== "") {
            sortedCars = sortedCars.filter(car => Number(car.price) >= Number(priceFrom.value))
        }
        if(priceTo.value !== "") {
            sortedCars = sortedCars.filter(car => Number(car.price) <= Number(priceTo.value))
        }
        displayCars(sortedCars)
    }
})



function initializeFilteredCarsByManufacturer() {
    if(manufacturerFilter.value !== "manufacturer") {
        sortedCars = JSON.parse(localStorage.getItem("cars")).filter(car => car.manufacturer === manufacturerFilter.value)
        if(categoryFilter.value !== "category") {
           sortedCars = sortedCars.filter(car => car.category === categoryFilter.value)
        }
        if(yearFilter.value !== "year") {
            sortedCars = sortedCars.filter(car => car.year === yearFilter.value)
        }
        if(priceFrom.value !== "") {
            sortedCars = sortedCars.filter(car => Number(car.price) >= Number(priceFrom.value))
        }
        if(priceTo.value !== "") {
            sortedCars = sortedCars.filter(car => Number(car.price) <= Number(priceTo.value))
        }
        displayCars(sortedCars)
    } else {
        sortedCars = JSON.parse(localStorage.getItem("cars"))
        modelFilter.innerHTML = `<option value="მოდელი">მოდელი</option>`
        modelFilter.disabled = true
        if(categoryFilter.value !== "category") {
           sortedCars = sortedCars.filter(car => car.category === categoryFilter.value)
        }
        if(yearFilter.value !== "year") {
            sortedCars = sortedCars.filter(car => car.year === yearFilter.value)
        }
        if(priceFrom.value !== "") {
            sortedCars = sortedCars.filter(car => Number(car.price) >= Number(priceFrom.value))
        }
        if(priceTo.value !== "") {
            sortedCars = sortedCars.filter(car => Number(car.price) <= Number(priceTo.value))
        }
        displayCars(sortedCars)
    }
} 

initializeFilteredCarsByManufacturer()

function initializeFilteredCarsByModels() {
    if(modelFilter.value !== "მოდელი") {
        sortedCars = JSON.parse(localStorage.getItem("cars")).filter(car => car.model === modelFilter.value)
        if(categoryFilter.value !== "category") {
            sortedCars = sortedCars.filter(car => car.category === categoryFilter.value)
        }
        if(yearFilter.value !== "year") {
            sortedCars = sortedCars.filter(car => car.year === yearFilter.value)
        }
        if(priceFrom.value !== "") {
            sortedCars = sortedCars.filter(car => Number(car.price) >= Number(priceFrom.value))
        }
        if(priceTo.value !== "") {
            sortedCars = sortedCars.filter(car => Number(car.price) <= Number(priceTo.value))
        }
        displayCars(sortedCars)
    } else {
        initializeFilteredCarsByManufacturer()
        if(categoryFilter.value !== "category") {
            sortedCars = sortedCars.filter(car => car.category === categoryFilter.value)
        }
        if(yearFilter.value !== "year") {
            sortedCars = sortedCars.filter(car => car.year === yearFilter.value)
        }
        if(priceFrom.value !== "") {
            sortedCars = sortedCars.filter(car => Number(car.price) >= Number(priceFrom.value))
        }
        if(priceTo.value !== "") {
            sortedCars = sortedCars.filter(car => Number(car.price) <= Number(priceTo.value))
        }
        displayCars(sortedCars)
    }
}  


function displayManufacturersFilter() {
    for(let i of selectionData) {
        const option = document.createElement("option")
        option.value = i.manufacturer
        option.textContent = i.manufacturer
        manufacturerFilter.append(option)
        manufacturerFilter.addEventListener("change", (e) => {
            if(e.target.value === i.manufacturer) {
                modelFilter.disabled = false
                modelFilter[0].selected = true
                initializeFilteredCarsByManufacturer()
                displayModelsFilter(i.models)
            } else {
                initializeFilteredCarsByManufacturer()
            }
        })
    }
}

displayManufacturersFilter()

function displayModelsFilter(models) {
    modelFilter.innerHTML = ""
    modelFilter.innerHTML = `<option>მოდელი</option>`
    for(let i of models) {
        const option = document.createElement("option")
        option.value = i.name
        option.textContent = i.name
        modelFilter.append(option)
        modelFilter.addEventListener("change", (e) => {
            if(e.target.value === i.name) {
                initializeFilteredCarsByModels()
            } else {
                initializeFilteredCarsByModels()
            }
        })
    }
}

// მანქანის დამატება 

class Car {
    constructor(manufacturer,model,category,year,price,engineCapacity,garbeni,wheel,image) {
        this.manufacturer = manufacturer
        this.model = model
        this.category = category
        this.year = year
        this.price = price
        this.engineCapacity = engineCapacity
        this.garbeni = garbeni,
        this.wheel = wheel
        this.image = image
    }
}

addCarForm.addEventListener("submit", (e) => {
    e.preventDefault()
    filterIcon.style.display = "block"
    const carData = new Car(manufacturer.value,model.value,category.value,year.value,price.value,engineCapacity.value,garbeni.value,wheel.value,currentImgUrl[0])

    addCarModal.style.display = "none"
    addCarIcon.style.display = "block"
    manufacturer.innerHTML = ""
    manufacturer.innerHTML = `<option>მწარმოებელი</option>`
    displayManufacturers()
    model.innerHTML = ""
    model.innerHTML = `<option>მოდელი</option>`
    model.disabled = true
    category.innerHTML = ""
    category.innerHTML = `<option>კატეგორია</option>`
    category.disabled = true
    year.innerHTML = ""
    year.innerHTML = `<option>გამოშვების წელი</option>`
    year.disabled = true
    price.value = ""
    engineCapacity.value = ""
    image.value = ""
    addToLocalStorage(carData)
})

cancelForm.addEventListener("click", () => {
    filterIcon.style.display = "block"
    addCarModal.style.display = "none"
    manufacturer.innerHTML = ""
    manufacturer.innerHTML = `<option>მწარმოებელი</option>`
    displayManufacturers()
    model.innerHTML = ""
    model.innerHTML = `<option>მოდელი</option>`
    model.disabled = true
    category.innerHTML = ""
    category.innerHTML = `<option>კატეგორია</option>`
    category.disabled = true
    year.innerHTML = ""
    year.innerHTML = `<option>გამოშვების წელი</option>`
    year.disabled = true
    price.value = ""
    engineCapacity.value = ""
    image.value = ""
    addCarIcon.style.display = "block"
    filterIcon.style.display = "block"
})

let showModal = false

addCarIcon.addEventListener("click", () => {
    addCarModal.style.display = "block"
    addCarIcon.style.display = "none"
    filterModal.style.display = "none"
    filterIcon.style.display = "none"
})

window.addEventListener("scroll", () => {
    if(this.scrollY > 70) {
        addCarIcon.classList.add("bottom-right")
        filterIcon.style.top = "20px"
    } else {
        addCarIcon.classList.remove("bottom-right")
        filterIcon.style.top = "100px"
    }
})

function addToLocalStorage(data) {
    if(localStorage.getItem("cars") === null) {
        localStorage.setItem("cars", JSON.stringify([data]))
    } else {
        const oldData = JSON.parse(localStorage.getItem("cars"))
        oldData.push(data)
        localStorage.setItem("cars", JSON.stringify(oldData))
    }
    displayCars()
}




function displayCars(cars = JSON.parse(localStorage.getItem("cars"))) {
    mainBar.innerHTML = ""
    if(JSON.parse(localStorage.getItem("cars") !== null)) {
        cars.map(car => {
        const UI = `
        <div class="card">
                <div class="card-img">
                    <img src="${car.image}" alt="No image found">
                </div>
                 <div class="car-info">
                <div class="head">
                    <h3>${car.manufacturer} ${car.model}</h3>
                    <p>${car.year} წ</p>
                </div>
                <div class="main-info">
                        <span><i class="fa-solid fa-gas-pump"></i>${car.engineCapacity}</span>
                        <span><i class="fa-solid fa-gauge"></i> ${car.garbeni} კმ</span>
                        <span><i class="fa-solid fa-caret-up"></i> ${car.category}</span>
                        <span><i class="fa-regular fa-compass"></i></i> ${car.wheel}</span>
                </div>
                </div>

                <div class="price">
                    <h3>${car.price} $</h3>
                </div>
        </div> 
        `
        mainBar.innerHTML += UI
    })
}
}


displayCars()

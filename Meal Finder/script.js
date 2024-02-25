const submit = document.getElementById("submit"),
  search = document.getElementById("search"),
  random = document.getElementById("random"),
  resultHeading = document.getElementById("result-heading"),
  meals = document.getElementById("meals"),
  singleMeal = document.getElementById("single-meal")

// Search Meal and fetch from API

function searchMeal(e) {
  e.preventDefault()

  // Clear single meal
  singleMeal.innerHTML = ""

  // Get search term
  const term = search.value

  // Chek for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        resultHeading.innerHTML = `<h2>Search results for ${term}:</h2>`

        if (data.meals == null) {
          resultHeading.innerHTML = `There are no search meals. Try again`
        } else {
          meals.innerHTML = data.meals
            .map(
              (meal) => `
            <div class="meal">
              <img src ="${meal.strMealThumb}" alt = "${meal.strMeal}" />
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
          `
            )
            .join("")
        }
      })
    // Clear search text
    search.value = ""
  } else {
    alert("Please write something")
  }
}

//

function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0]

      addMealToDOM(meal)
    })
}

// Fetch random meal from API

function getRandomMeal() {
  meals.innerHTML = ""
  resultHeading.innerHTML = ""

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0]

      addMealToDOM(meal)
    })
}

// Add meal to DOM
function addMealToDOM(meal) {
  const ingredients = []

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      )
    } else {
      break
    }
  }

  singleMeal.innerHTML = `
    <div class='single-meal'>
      <h1>${meal.strMeal}</h1>
      <img src='${meal.strMealThumb}' alt='${meal.strMeal}' />

      <div class='single-meal-info'>
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
      </div>
      <div class='main'>
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
        </ul>
      </div>
    </div>
  `
}

// Event listeners
submit.addEventListener("submit", searchMeal)
random.addEventListener("click", getRandomMeal)

meals.addEventListener("click", (e) => {
  const mealInfo = e.composedPath().find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info")
    } else {
      return false
    }
  })

  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid")
    getMealById(mealID)
  }
})

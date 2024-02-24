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

//   Event Listeners

submit.addEventListener("submit", searchMeal)

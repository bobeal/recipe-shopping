var recipes = [
  { name: 'Quiche Lorraine',
    key: 'quiche-lorraine',
    ingredients: [
        { name: 'Creme liquide', quantity: '30', unit: 'cl'},
        { name: 'Lardons', quantity: '90', unit: 'grammes'}
    ]
  },
  { name: 'Crevettes à la charmoula',
    key: 'crevettes-charmoula',
    ingredients: [
        { name: 'Crevettes', quantity: '150', unit: 'grammes'},
        { name: 'Coriandre fraiche', quantity: '10', unit: 'grammes'}
    ]
  }
];

var AggregatedShoppingList = React.createClass({
  getInitialState: function() {
    return {
      selectedRecipes: ['quiche-lorraine']
    };
  },
  render: function() {
    return (
      <div>
        <RecipesList recipes={recipes} selectedRecipes={this.state.selectedRecipes} />
        <ShoppingList recipes={recipes} selectedRecipes={this.state.selectedRecipes} />
      </div>
    );
  }
});

var RecipesList = React.createClass({
  render: function() {
    var recipesInputs = [];
    this.props.recipes.forEach(function(recipe) {
      if (this.props.selectedRecipes.indexOf(recipe.key) != -1) {
        recipesInputs.push(<Recipe recipe={recipe} key={recipe.key} checked='true' />);
      } else {
        recipesInputs.push(<Recipe recipe={recipe} key={recipe.key} />);
      }
    }.bind(this));
    return (
      <form>
        {recipesInputs}
      </form>
    );
  }
});

var Recipe = React.createClass({
  render: function() {
    return (
      <p>
        <label htmlFor={this.props.recipe.key}>{this.props.recipe.name}</label>
        <input type='checkbox' name={this.props.recipe.key} id={this.props.recipe.key} checked={this.props.checked} />
      </p>
    );
  }
});

var ShoppingList = React.createClass({
  render: function() {
    var ingredients = [];
    this.props.recipes.forEach(function(recipe) {
      if (this.props.selectedRecipes.indexOf(recipe.key) != -1) {
        recipe.ingredients.forEach(function(ingredient) {
          ingredients.push(<ShoppingEntry ingredient={ingredient} key={ingredient.name} />);
        });
      }
    }.bind(this));
    return (
      <div className='shoppingList'>
        <h2>Liste de courses</h2>
        <ul>
          {ingredients}
        </ul>
      </div>
    );
  }
});

var ShoppingEntry = React.createClass({
  render: function() {
    return (
      <li>{this.props.ingredient.name} - {this.props.ingredient.quantity} {this.props.ingredient.unit}</li>
    );
  }
});

React.render(
  <AggregatedShoppingList recipes={recipes} />,
  document.getElementById('content')
);

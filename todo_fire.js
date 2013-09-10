var todoApp = angular.module('todoApp', ['firebase']);


todoApp.controller('TodoController', ['$scope', 'angularFire',
    function($scope, angularFire) {
        // Array representing the list of todos
        $scope.todos = [];
        // Load status
        $scope.loaded = false;
        
        var ref = new Firebase('https://bywong.firebaseio.com/todos');
        angularFire(ref, $scope, "todos");
        
        $scope.addTodo = function(title) {
            // Reset the title to an empty string
            $scope.newTodoTitle = '';
            // Each todo is an object with a title, completed status and a generated ID
            // Push the newly created todo into the list
            $scope.todos.push({
                title: title,
                completed: false,
                id: generateID()
            });
        };
        
        $scope.changeCompleted = function(todo) {
            // Update the todo
            var message = (todo.completed === true) ? 'Task Completed!' : 'Task Uncompleted!';
        };
    
        $scope.removeCompletedItems = function() {
            // Array to contain all uncompleted todos
            var uncompleted_todos = [];
            // If a todo is completed, delete it
            $scope.todos.forEach(function(todo) {
                if (todo.completed === true) {
                    deleteTodo(todo.id);
                }
                else {
                    uncompleted_todos.push(todo);
                }
            });
            // Set todo list to list of uncompleted todos
            $scope.todos = uncompleted_todos;
        };
    
        function deleteTodo(id) {
            // Delete function only for todo_xhr.js
        }
        // Random ID generator
        function generateID() {
            var rand = Math.random();
            var id = rand*1000000000000000000;
            $scope.todos.forEach(function(todo) {
                if (todo.id === id) {
                    generateID();
                }
            });
            return id;
        }
    }
]);
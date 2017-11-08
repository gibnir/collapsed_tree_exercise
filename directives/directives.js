let appDirectives = angular.module('appDirectives', []);

appDirectives.directive('tree', function() {
  return {
    restrict: 'E', // tells Angular to apply this to only html tag that is <tree>
    replace: true, // tells Angular to replace <tree> by the whole template
    scope: {
      treeNode: '=src' // create an isolated scope variable 'treeNode' and pass 'src' to it.  
    },    
    template: '<ul><branch ng-repeat="category in treeNode.contacts" src="category"></branch></ul>'    
  };
})

appDirectives.directive('branch', function($compile) {
  return {
    restrict: 'E', // tells Angular to apply this to only html tag that is <branch>
    replace: true, // tells Angular to replace <branch> by the whole template
    scope: {
      branchNode: '=src' // create an isolated scope variable 'branchNode' and pass 'src' to it.  
    },    
    template: '<li><a>{{ branchNode.name }}</a></li>',
    link: function(scope, element, attrs) {
      // Check if there are any children, otherwise we'll have infinite execution
      let has_children = angular.isArray(scope.branchNode.contacts);
      
      // Start collapsed
      element.toggleClass('collapsed');

      // Manipulate HTML in DOM
      if (has_children) {        
        element.append('<tree src="branchNode"></tree>');
        
        // recompile Angular because of manual appending
        $compile(element.contents())(scope); 
      }
      
      // Bind events
      element.on('click', function(event) {
          event.stopPropagation();          
        
          if (has_children) {
            element.toggleClass('collapsed');
          }
      });      
    }
  };
})

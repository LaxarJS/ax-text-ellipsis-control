/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
define( [
   'angular',
   'jquery',
   'trunk8'
], function( ng, $ ) {
   'use strict';

   var textEllipsisDirectiveName = 'axTextEllipsis';
   var textEllipsisDirective = [ function() {
      return {
         restrict: 'A',
         link: function link( scope, element, attrs ) {
            if( attrs[ textEllipsisDirectiveName ] ) {
               var config = scope.$eval( attrs[ textEllipsisDirectiveName ]);
               $( element ).trunk8( config );
            }
            else {
               $( element ).trunk8();
            }
         }
      };
   } ];

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   var bindTruncatedDirectiveName = 'axBindTruncated';
   var bindTruncatedDirective = [ function() {
      return {
         restrict: 'A',
         link: function( scope, element, attr ) {

            var isTruncated = false;
            var options = getTruncationOptions( scope, attr );

            scope.$watch( attr[ bindTruncatedDirectiveName ], function( value ) {
               if( value == null || value === '' ) {
                  // The check for '' is necessary due to a bug in trunk8.update
                  element.text( '' );
                  return;
               }

               if( !isNaN( options.width ) && value.length <= options.width ) {
                  // This explicit check prevents from triggering a bug in trunk8 plugin
                  element.text( value );
                  return;
               }

               if( !isTruncated ) {
                  isTruncated = true;
                  element.text( value );
                  $( element ).trunk8( options );
               }
               else {
                  // trunk8 internally uses the html method. We thus need to encode html entities ourselves
                  var htmlEncoded = $( '<div>' ).text( value ).html();
                  $( element ).trunk8( 'update', htmlEncoded );
               }

            } );
         }
      };
   } ];

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   var bindHtmlTruncatedDirectiveName = 'axBindHtmlTruncated';
   var bindHtmlTruncatedDirective = [ '$sanitize', function( $sanitize ) {
      return {
         restrict: 'A',
         link: function( scope, element, attr ) {

            var isTruncated = false;
            var options = getTruncationOptions( scope, attr );

            scope.$watch( attr[ bindHtmlTruncatedDirectiveName ], function( value ) {
               var sanitizedValue = $sanitize( value );
               if( sanitizedValue == null || sanitizedValue === '' ) {
                  // The check for '' is necessary due to a bug in trunk8.update
                  element.html( '' );
                  return;
               }

               if( !isNaN( options.width ) && sanitizedValue.length <= options.width ) {
                  // This explicit check prevents from triggering a bug in trunk8 plugin
                  element.html( sanitizedValue );
                  return;
               }

               if( !isTruncated ) {
                  isTruncated = true;
                  element.html( sanitizedValue );
                  $( element ).trunk8( options );
               }
               else {
                  $( element ).trunk8( 'update', sanitizedValue );
               }

            } );
         }
      };
   } ];

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   var truncationOptionsAttribute = 'axTruncationOptions';

   function getTruncationOptions( scope, attr ) {
      return scope.$eval( attr[ truncationOptionsAttribute ] ) || {};
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return ng.module( textEllipsisDirectiveName + 'Control', [] )
      .directive( textEllipsisDirectiveName, textEllipsisDirective )
      .directive( bindTruncatedDirectiveName, bindTruncatedDirective )
      .directive( bindHtmlTruncatedDirectiveName, bindHtmlTruncatedDirective );

} );

Based on JAvascript and JScript
 ISO/IEC JTC 1 16262
 ES2016: Array.prototype call includes 
 ES2017: Async, Shared Mmemory ( with multi agents), Atomics as long,
         Object.values,Object.entries, Object.getOwnPropertyDescriptor
 ES2018: asyncron interation with own protocol for a async generator 
          new expressions: dotAll flag
 ES2019: flat, flatMap, Array.prototype, Object.fromEntries for creating an new Object, trimStart trimEnd on
 String.prototype , Array.prototype.sort (req.: JSON.stringify ) as Function.prototype.toString
 
 
 
 ECMAScript2020 ( 11th edition ) matchAll for Strings, import(), a syntax to use async import Moduls with dynamic specifier, 
 BitInt a new numbe for primitive  arbitrary precision integers
 Promise.allSettled a new Prmoise combinator, globalThis to access the global this value,
 !!! dedicated export * as ns from 'module' syntax,
 increse for-in enumartion order,
 import.meta a host-populated object 
 2 features for working with "nullish"values ( null and undefined):
 nullisch coalescing, 
 "strict" mode selection
 
 primitive values:member of one of the types Undefined, Null, Boolean, Number, BigInt, Symbol, or String as defined in clause 6
 constructorfunction: object that creates and initializes objects
 prototype object that provides shared properties for other objects
 ordinary object:object that has the default behaviour for the essential internal methods that must be supported by all objects
 exotic object object that does not have the default behaviour for one or more of the essential internal methods
 Any object that is not an ordinary object is an exotic object.
 standard object: object whose semantics are defined by this specification
 built-in object: A built-in constructor is a built-in object that is also a constructor.
 undefined value: primitive value used when a variable has not been assigned a value
 undefined type: type whose sole value is the undefined value
 null value: primitive value that represents the intentional absence of any object value
 Null type: type whose sole value is the null value
 Boolean object: member of the Object type that is an instance of the standard built-in Boolean constructor
 # NOTE: A Boolean object is created by using the Boolean constructor in a new expression, supplying a Boolean value as an 
 argument. The resulting object has an internal slot whose value is the Boolean ptional third-party analytics cookies to understand how you value. 
 A Boolean object can be coerced to a Boolean value.
 Infinity: Number value that is the positive infinite Number value
 NaN: not a number value 
 Symbol value: primitive value that represents a unique, non-String Object property keyWe use optional third
 function: member of the Object type that may be invoked as a subroutine
 # NOTE
In addition to its properties, a function contains executable code and state that determine how it behaves when invoked. A function's code may or may not be written in ECMAScript.

built-in function built-in object that is a function
property: part of an object that associates a key (either a String value or a Symbol value) and a value
method: function that is the value of a property
# NOTE
When a function is called as a method of an object, the object is passed to the function as its this value.
built-in method
method that is a built-in function

# NOTE:Standard built-in methods are defined in this specification. A host or implementation may provide additional built-in methods that are not described in this specification.
attribute:internal value that defines some characteristic of a property

4.4.40 own property

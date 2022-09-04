// Simple Arithmetics Grammar
// ==========================
//
// Accepts expressions like "2 * (3 + 4)" and computes their value.

{
  function makeInteger(o) {
    return o ? parseInt(o[0].join(""), 10) : 0;
  }
}

Expression
  = head:Term tail:(_ ("+" / "-") _ Term)* {
      return tail.reduce(function(result, element) {
        if (element[1] === "+") { return result + element[3]; }
        if (element[1] === "-") { return result - element[3]; }
      }, head);
    }

Term
  = head:Factor tail:(_ ("*" / "/") _ Factor)* {
      return tail.reduce(function(result, element) {
        if (element[1] === "*") { return result * element[3]; }
        if (element[1] === "/") { return result / element[3]; }
      }, head);
    }

Factor
  = "(" _ @Expression _ ")"
  / Integer

Integer "integer"
  = _ hour:([0-9]+ "h")? _ minute:([0-9]+ "m")? _ second:([0-9]+ "s")? {
      console.log({hour, minute, second});
      return makeInteger(hour)*3600 + makeInteger(minute)*60 + makeInteger(second);
    }

_ "whitespace"
  = [ \t\n\r]*

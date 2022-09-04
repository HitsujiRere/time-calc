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
  / Time

Integer "integer"
  = _ [0-9]+ !("h" / "m" / "s") { return parseInt(text(), 10); }

Time "time"
  = _ hour:([0-9]+ "h")? _ minute:([0-9]+ "m")? _ second:([0-9]+ "s")? { return makeInteger(hour)*3600 + makeInteger(minute)*60 + makeInteger(second); }

_ "whitespace"
  = [ \t\n\r]*

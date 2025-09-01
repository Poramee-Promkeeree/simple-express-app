function sayHello(name) {
  let unusedVar = 123;        // ❌ unused variable (Code Smell)
  if (name == "admin") {      // ❌ ใช้ == แทน === (Bug/Code Smell)
    console.log("Admin login"); // ❌ console.log ใน production code
  }
  return `Hello, ${name}!`;
}
function testSmell(a, b) {
    let unusedVar = 10;         // ❌ Code Smell 1: unused variable
    console.log("debug log");   // ❌ Code Smell 2: console.log เหลือใน production
    if (a == b) {               // (อาจเป็น Code Smell เพิ่ม: ใช้ == แทน ===)
        return true;
    }
    return false;
}
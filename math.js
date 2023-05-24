const solveQuadraticEquation = (a, b, c) => {
      return new Promise((resolve, reject) => {
        let delta = b * b - 4 * a * c;

        if (delta < 0) {
          // Phương trình không có nghiệm thực
          reject("Phương trình không có nghiệm thực");
        } else if (delta === 0) {
          // Phương trình có nghiệm kép
          let x = -b / (2 * a);
          resolve([x]);
        } else {
          // Phương trình có hai nghiệm phân biệt
          let x1 = (-b + Math.sqrt(delta)) / (2 * a);
          let x2 = (-b - Math.sqrt(delta)) / (2 * a);
          resolve([x1, x2]);
        }
      });
    }
const formatSolution = (solution) => {
  if (typeof solution === 'number') {
    return solution.toString();
  } else if (Array.isArray(solution)) {
    let numerator = solution[0];
    let denominator = solution[1];
    return numerator + "/" + denominator;
  } else {
    return '√' + solution.toString();
  }
}

const  solveEquation async = ()=> {
  let a = parseFloat(document.getElementById("input-a").value);
  let b = parseFloat(document.getElementById("input-b").value);
  let c = parseFloat(document.getElementById("input-c").value);

  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    document.getElementById("result").innerHTML = "Vui lòng nhập đầy đủ và đúng kiểu số";
    return;
  }

  try {
    let solutions = await solveQuadraticEquation(a, b, c);
    let formattedSolutions = solutions.map((solution) => formatSolution(solution));
    document.getElementById("result").innerHTML = "Các nghiệm của phương trình là: " + formattedSolutions.join(", ");
  } catch (error) {
    document.getElementById("result").innerHTML = "Đã xảy ra lỗi: " + error;
  }
}

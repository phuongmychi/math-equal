



function decimalToFraction(decimal) {
  // Kiểm tra số đầu vào là số âm hay không
  let isNegative = decimal < 0;
  decimal = Math.abs(decimal);

  // Tìm phần nguyên của số thập phân
  let wholeNumber = Math.floor(decimal);

  // Tìm phần thập phân
  let fractionalPart = decimal - wholeNumber;

  // Tìm ước số chung lớn nhất giữa phần thập phân và 1
  let gcd = function(a, b) {
    if (b < 0.0000001) return a; // Kiểm tra điều kiện dừng đệ quy
    return gcd(b, Math.floor(a % b)); // Gọi đệ quy
  };

  let denominator = 1; // Mẫu số ban đầu
  let numerator = Math.round(fractionalPart * denominator); // Tử số ban đầu

  // Rút gọn phân số bằng cách tìm ước số chung lớn nhất giữa tử số và mẫu số
  let divisor = gcd(numerator, denominator);
  numerator /= divisor;
  denominator /= divisor;

  // Thêm phần nguyên vào phân số
  numerator += wholeNumber * denominator;

  // Nếu số ban đầu là số âm, đảo dấu của phân số
  if (isNegative) {
    numerator = -numerator;
  }

  
  return numerator + '/' + denominator;
}

// Sử dụng hàm decimalToFraction để chuyển đổi số thập phân
let decimalNumber = 3.75;
let fraction = decimalToFraction(decimalNumber);



const solveQuadraticEquation = (a, b, c) => {
      return new Promise((resolve, reject) => {
        let delta = b * b - 4 * a * c;

        if (delta < 0) {
          // Phương trình không có nghiệm thực
          reject("Phương trình không có nghiệm thực");
        } else if (delta === 0) {
          // Phương trình có nghiệm kép
          let x = -b / (2 * a);
          let fraction = decimalToFraction(x);
          resolve([fraction]);
        } else {
          // Phương trình có hai nghiệm phân biệt
          let x1 = (-b + Math.sqrt(delta)) / (2 * a);
          let x2 = (-b - Math.sqrt(delta)) / (2 * a);
            let fraction1 = decimalToFraction(x1);
              let fraction2 = decimalToFraction(x2);
          resolve([fraction1, fraction2]);
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

const  solveEquation = async ()=> {
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

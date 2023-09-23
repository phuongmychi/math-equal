
// Giải phương trình bậc 4 bằng thuật toán Ferrari
function solveQuartic(a: number, b: number, c: number, d: number, e: number): number[] {
  let f = ((-3 * Math.pow(b, 2)) / (8 * Math.pow(a, 2))) + ((c) / (a));
  let g = ((Math.pow(b, 3)) / (8 * Math.pow(a, 3))) - ((b * c) / (2 * Math.pow(a, 2))) + ((d) / (a));
  let h = ((-3 * Math.pow(b, 4)) / (256 * Math.pow(a, 4))) + ((Math.pow(b, 2) * c) / (16 * Math.pow(a, 3))) - ((b * d) / (4 * Math.pow(a, 2))) + ((e) / (a));
  
  let p = (-Math.pow(f, 2)) / (12 * h);
  let q = (-f * p) / (3 * h);
  let r = (Math.pow(g, 2)) / (8 * Math.pow(h, 2)) + ((p) / (2 * h)) - ((f) / (3 * h));
  
  let y: number;
  
  if(Math.pow(q, 3) + Math.pow(r, 2) > 0) {
    y = Math.cbrt(-r + Math.sqrt(Math.pow(q, 3) + Math.pow(r, 2)));
    y += Math.cbrt(-r - Math.sqrt(Math.pow(q, 3) + Math.pow(r, 2)));
    y -= f / (3 * h);
    
    return [y];
    
  } else if(Math.pow(q, 3) + Math.pow(r, 2) == 0) {
    let z = (-5 * q) / (6 * r);
    y = z - f / (3 * h);
    
    return [y];
    
  } else {
    let s = Math.sqrt(-(Math.pow(q, 3) + Math.pow(r, 2)));
    let u = Math.cbrt(s - r);
    let v = -Math.cbrt(s + r);
    y = u + v - f / (3 * h);
    
    return [y];
    
    // Uncomment the following lines to include complex roots
    //let x1 = u + v - f / (3 * h);
    //let x2_re = -(u + v) / 2 - f / (3 * h);
    //let x2_im = (u - v) * Math.sqrt(3) / 2;
    //let x3_re = -(u + v) / 2 - f / (3 * h);
    //let x3_im = -(u - v) * Math.sqrt(3) / 2;
    //return [x1,x2_re+x2_im+'i',x3_re+x3_im+'i'];
    
   }
}

// Sử dụng đoạn code để giải phương trình bậc tư
let roots: number[] = solveQuartic(1,-10,-24,-26,-9);
console.log(`Nghiệm của phương trình là ${roots}`);



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
          resolve([x]);
        } else {
          // Phương trình có hai nghiệm phân biệt
          let x1 = (-b + Math.sqrt(delta)) / (2 * a);
          let x2 = (-b - Math.sqrt(delta)) / (2 * a);
            let fraction1 = decimalToFraction(x1);
              let fraction2 = decimalToFraction(x2);
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

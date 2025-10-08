import unittest
from Calc import Calculator  # The class we are going to implement


class TestCalculator(unittest.TestCase):
    def setUp(self):
        """Set up test fixture - runs before each test"""
        self.calc = Calculator()
    
    # Test 1: Addition (Already provided)
    def test_add_positive_numbers(self):
        result = self.calc.add(2, 3)
        self.assertEqual(result, 5)     # Expect 2 + 3 = 5
    
    def test_add_negative_numbers(self):
        result = self.calc.add(-2, -3)
        self.assertEqual(result, -5)
    
    # Test 2: Subtraction
    def test_subtract_positive_numbers(self):
        result = self.calc.subtract(5, 3)
        self.assertEqual(result, 2)
    
    def test_subtract_negative_result(self):
        result = self.calc.subtract(3, 5)
        self.assertEqual(result, -2)
    
    def test_subtract_negative_numbers(self):
        result = self.calc.subtract(-5, -3)
        self.assertEqual(result, -2)
    
    # Test 3: Multiplication
    def test_multiply_positive_numbers(self):
        result = self.calc.multiply(4, 5)
        self.assertEqual(result, 20)
    
    def test_multiply_with_zero(self):
        result = self.calc.multiply(5, 0)
        self.assertEqual(result, 0)
    
    def test_multiply_negative_numbers(self):
        result = self.calc.multiply(-3, 4)
        self.assertEqual(result, -12)
    
    # Test 4: Division
    def test_divide_integers_exact(self):
        result = self.calc.divide(10, 2)
        self.assertEqual(result, 5.0)
        self.assertIsInstance(result, float)
    
    def test_divide_integers_with_remainder(self):
        result = self.calc.divide(10, 3)
        self.assertAlmostEqual(result, 3.333333, places=5)
    
    def test_divide_negative_numbers(self):
        result = self.calc.divide(-10, 2)
        self.assertEqual(result, -5.0)
    
    def test_divide_by_zero_raises_exception(self):
        with self.assertRaises(ValueError) as context:
            self.calc.divide(10, 0)
        self.assertEqual(str(context.exception), "Cannot divide by zero")

    def test_divide_should_fail(self):
        """This test is intentionally wrong to break the build"""
        result = self.calc.divide(10, 2)
        self.assertEqual(result, 999)  # ❌ 錯誤的期望值

if __name__ == "__main__":
    unittest.main()
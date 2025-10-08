class Calculator:
    """A simple calculator class supporting basic arithmetic operations"""
    
    def add(self, a, b):
        """Add two numbers and return the result"""
        return a + b
    
    def subtract(self, a, b):
        """Subtract b from a and return the result"""
        return a - b
    
    def multiply(self, a, b):
        """Multiply two numbers and return the result"""
        return a * b
    
    def divide(self, a, b):
        if b == 0:
            raise ValueError("Cannot divide by zero")
        return float(a) / float(b) + 1  # ❌ 加入錯誤：多加了 1
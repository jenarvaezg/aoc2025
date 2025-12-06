import re

def solve_cephalopod_math(file_path):
    try:
        with open(file_path, 'r') as f:
            raw_lines = f.readlines()
    except FileNotFoundError:
        return "Error: No se encontró el archivo input.txt"

    grid = []
    
    # 1. Limpieza: Eliminar pero mantener alineación
    for line in raw_lines:
        grid.append(line)

    if not grid:
        return 0

    # Normalizar ancho (rellenar con espacios a la derecha)
    max_width = max(len(line) for line in grid)
    padded_grid = [line.ljust(max_width) for line in grid]
    
    grand_total = 0
    current_problem_cols = []
    
    # 2. Escaneo de columnas (Izquierda -> Derecha)
    for x in range(max_width):
        col_chars = [row[x] for row in padded_grid]
        
        # Una columna es "vacía" si solo tiene espacios
        is_empty_col = all(c == ' ' for c in col_chars)
        
        if not is_empty_col:
            current_problem_cols.append(x)
        else:
            # Fin de un bloque de problema
            if current_problem_cols:
                grand_total += calculate_block(current_problem_cols, padded_grid)
                current_problem_cols = []
    
    # Procesar último bloque si existe
    if current_problem_cols:
        grand_total += calculate_block(current_problem_cols, padded_grid)
        
    return grand_total

def calculate_block(col_indices, grid):
    # Extraer el sub-grid del problema
    # Solo las columnas relevantes
    problem_lines = []
    for row in grid:
        slice_str = "".join([row[i] for i in col_indices])
        problem_lines.append(slice_str)
    
    numbers = []
    operator = None
    
    # 3. Escaneo vertical (Abajo -> Arriba)
    # Buscamos el operador primero
    for i in range(len(problem_lines) - 1, -1, -1):
        line_content = problem_lines[i].strip()
        
        if not line_content:
            continue
            
        if operator is None:
            # El primer caracter no vacío desde abajo es el operador
            if '+' in line_content:
                operator = '+'
            elif '*' in line_content:
                operator = '*'
            # Si encontramos un número antes que un operador, es parte del número de abajo
            # (aunque el problema dice que el símbolo está al final/fondo)
        else:
            # Ya tenemos operador, el resto hacia arriba son números
            try:
                # Puede haber basura o espacios, filtramos
                if any(c.isdigit() for c in line_content):
                    num = int(line_content)
                    numbers.append(num)
            except ValueError:
                pass 
    
    if not numbers:
        return 0
    
    # Invertir números para operar en orden (aunque para + y * no afecta, es buena práctica)
    numbers.reverse()
    
    result = numbers[0]
    for num in numbers[1:]:
        if operator == '+':
            result += num
        elif operator == '*':
            result *= num
            
    return result

# Ejecutar
print(f"Grand Total: {solve_cephalopod_math('input.txt')}")

def solve_cephalopod_math_part_two(file_path):
    try:
        with open(file_path, 'r') as f:
            raw_lines = f.readlines()
    except FileNotFoundError:
        return "Error: No se encontró el archivo input.txt"
    # 1. Limpieza y preparación (Igual que Parte 1)
    grid = []
    
    for line in raw_lines:
        grid.append(line)
        
    max_width = max(len(line) for line in grid)
    padded_grid = [line.ljust(max_width) for line in grid]
    
    grand_total = 0
    current_problem_cols = []
    
    # 2. Escaneo de columnas para definir bloques
    for x in range(max_width):
        col_chars = [row[x] for row in padded_grid]
        is_empty_col = all(c == ' ' for c in col_chars)
        
        if not is_empty_col:
            current_problem_cols.append(x)
        else:
            if current_problem_cols:
                grand_total += process_vertical_block(current_problem_cols, padded_grid)
                current_problem_cols = []
    
    # Procesar último bloque si existe
    if current_problem_cols:
        grand_total += process_vertical_block(current_problem_cols, padded_grid)
        
    return grand_total

def process_vertical_block(col_indices, grid):
    numbers = []
    operator = None
    
    # Buscar el operador en el bloque (generalmente en las últimas filas)
    # y extraer números columna por columna
    
    # 1. Identificar Operador
    for x in col_indices:
        for row in grid:
            char = row[x]
            if char in '+*':
                operator = char
                break
        if operator: break
            
    # Si no hay operador, asumimos suma (o ignoramos, según la robustez necesaria)
    if not operator: return 0
    
    # 2. Extraer Números Verticales
    for x in col_indices:
        digits = []
        for row in grid:
            char = row[x]
            if char.isdigit():
                digits.append(char)
        
        if digits:
            # Unimos los dígitos de arriba a abajo para formar el número
            number = int("".join(digits))
            numbers.append(number)
            
    if not numbers: return 0
    
    # 3. Calcular
    result = numbers[0]
    for num in numbers[1:]:
        if operator == '+':
            result += num
        elif operator == '*':
            result *= num
            
    return result

print(solve_cephalopod_math_part_two('input.txt'))
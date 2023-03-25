enum Operator {
    Eq = '=',
    Ne = '<>',
    Lt = '<',
    Lte = '<=',
    Gt = '>',
    Gte = '>=',
    Or = 'OR',
    And = 'AND',
    Not = 'NOT',
}

interface SQLClause {
    write(): string;
}

class Value implements SQLClause {
    constructor(private value: string) { }

    public write(): string {
        return this.value;
    }
}

class WhereClause implements SQLClause {
    constructor(private column: Value, private operator: Operator, private value: Value) { }

    public write(): string {
        return `(${this.column.write()} ${this.operator} ${this.value.write()})`;
    }
}

class InClause implements SQLClause {
    constructor(private column: Value, private values: number[], private not: boolean) { }

    public write(): string {
        const notStr = this.not ? 'NOT ' : '';
        const valuesStr = this.values.join(', ');
        return `${this.column.write()} ${notStr}IN (${valuesStr})`;
    }
}

class IsNullClause implements SQLClause {
    constructor(private column: Value, private not: boolean) { }

    public write(): string {
        const notStr = this.not ? 'NOT ' : '';
        return `${this.column.write()} ${notStr}IS NULL`;
    }
}

export { Operator, Value, WhereClause, InClause, IsNullClause };
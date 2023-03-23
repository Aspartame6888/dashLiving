import { WhereClause, Value, Operator, InClause, IsNullClause } from './q3';

describe('test', () => {
  it('example 1', () => {
    const clause = new WhereClause(new Value('amount'), Operator.Eq, new Value('100'));
    expect(clause.write()).toEqual('(amount = 100)');
  });

  it('example 2', () => {
    const clause = new WhereClause(new Value('amount'), Operator.Ne, new Value('100'));
    expect(clause.write()).toEqual('(amount <> 100)');
  });

  it('example 3', () => {
    const clause = new WhereClause(new Value('amount'), Operator.Lt, new Value('100'));
    expect(clause.write()).toEqual('(amount < 100)');
  });

  it('example 4', () => {
    const clause = new WhereClause(new Value('amount'), Operator.Lte, new Value('100'));
    expect(clause.write()).toEqual('(amount <= 100)');
  });

  it('example 5', () => {
    const clause = new WhereClause(new Value('amount'), Operator.Gt, new Value('100'));
    expect(clause.write()).toEqual('(amount > 100)');
  });

  it('example 6', () => {
    const clause = new WhereClause(new Value('amount'), Operator.Gte, new Value('100'));
    expect(clause.write()).toEqual('(amount >= 100)');
  });

  it('example 7', () => {
    const clause = new InClause(new Value('category_id'), [1, 2, 3], false);
    expect(clause.write()).toEqual('category_id IN (1, 2, 3)');
  });

  it('example 8', () => {
    const clause = new InClause(new Value('category_id'), [1, 2, 3], true);
    expect(clause.write()).toEqual('category_id NOT IN (1, 2, 3)');
  });

  it('example 9', () => {
    const clause = new IsNullClause(new Value('phone'), false);
    expect(clause.write()).toEqual('phone IS NULL');
  });

  it('example 10', () => {
    const clause = new IsNullClause(new Value('phone'), true);
    expect(clause.write()).toEqual('phone IS NOT NULL');
  });

  it('example 11', () => {
    const clause1 = new WhereClause(new Value('amount'), Operator.Gte, new Value('1000'));
    const clause2 = new WhereClause(new InClause(new Value('category_id'), [1, 2, 5], false), Operator.Or, new IsNullClause(new Value('phone'), true));
    const clause3 = new WhereClause(clause1, Operator.And, clause2);
    const clause4 = new WhereClause(clause3, Operator.Or, new IsNullClause(new Value('first_name'), false));
    expect(clause4.write()).toEqual('(((amount >= 1000) AND (category_id IN (1, 2, 5) OR phone IS NOT NULL)) OR first_name IS NULL)');
  });
});

/*
 * Software Testing HW3: BoundedQueue Test Suite
 * Base Choice Coverage (BCC) + Bonus Tests
 * Using Node.js built-in test runner
 */

const test = require('node:test');
const assert = require('assert');
const BoundedQueue = require('./BoundedQueue');

// ============================================================================
// CONSTRUCTOR TESTS (BCC)
// ============================================================================

test('Constructor Tests (BCC)', async (t) => {
    await t.test('C-B1: Valid positive capacity (10)', () => {
        const bq = new BoundedQueue(10);
        assert.strictEqual(bq.capacity, 10);
        assert.strictEqual(bq.size, 0);
    });

    await t.test('C-B2: Zero capacity', () => {
        const bq = new BoundedQueue(0);
        assert.strictEqual(bq.capacity, 0);
        assert.strictEqual(bq.size, 0);
    });

    await t.test('C-B3: Negative capacity (-1) throws RangeError', () => {
        assert.throws(
            () => new BoundedQueue(-1),
            RangeError
        );
    });
});

// ============================================================================
// ENQUEUE TESTS (BCC)
// ============================================================================

test('Enqueue Tests (BCC)', async (t) => {
    await t.test('E-Base: Valid element (42) to partially filled queue', () => {
        const bq = new BoundedQueue(10);
        for (let i = 0; i < 5; i++) {
            bq.enqueue(i);
        }
        bq.enqueue(42);
        assert.strictEqual(bq.size, 6);
    });

    await t.test('E-B1: Valid element (42) to empty queue', () => {
        const bq = new BoundedQueue(10);
        bq.enqueue(42);
        assert.strictEqual(bq.size, 1);
    });

    await t.test('E-B2: NaN element to partially filled queue throws RangeError', () => {
        const bq = new BoundedQueue(10);
        for (let i = 0; i < 5; i++) {
            bq.enqueue(i);
        }
        assert.throws(
            () => bq.enqueue(NaN),
            RangeError
        );
    });

    await t.test('E-B3: Valid element to full queue throws Error', () => {
        const bq = new BoundedQueue(10);
        for (let i = 0; i < 10; i++) {
            bq.enqueue(i);
        }
        assert.throws(
            () => bq.enqueue(42),
            {
                name: 'Error',
                message: 'queue is full'
            }
        );
    });

    await t.test('E-B4: String element to partially filled queue throws RangeError', () => {
        const bq = new BoundedQueue(10);
        for (let i = 0; i < 5; i++) {
            bq.enqueue(i);
        }
        assert.throws(
            () => bq.enqueue("string"),
            RangeError
        );
    });
});

// ============================================================================
// DEQUEUE TESTS (BCC)
// ============================================================================

test('Dequeue Tests (BCC)', async (t) => {
    await t.test('D-Base: Dequeue from queue with multiple elements', () => {
        const bq = new BoundedQueue(10);
        for (let i = 0; i < 5; i++) {
            bq.enqueue(i);
        }
        const result = bq.dequeue();
        assert.strictEqual(result, 0);
        assert.strictEqual(bq.size, 4);
    });

    await t.test('D-B1: Dequeue from empty queue throws Error', () => {
        const bq = new BoundedQueue(10);
        assert.throws(
            () => bq.dequeue(),
            {
                name: 'Error',
                message: 'queue is empty'
            }
        );
    });

    await t.test('D-B2: Dequeue from queue with single element', () => {
        const bq = new BoundedQueue(10);
        bq.enqueue(42);
        const result = bq.dequeue();
        assert.strictEqual(result, 42);
        assert.strictEqual(bq.size, 0);
        assert.strictEqual(bq.is_empty(), true);
    });
});

// ============================================================================
// BONUS: BOUNDARY VALUE ANALYSIS (BVA)
// ============================================================================

test('Bonus: Boundary Value Analysis (BVA)', async (t) => {
    await t.test('BVA-C1: Minimal non-trivial capacity (1)', () => {
        const bq = new BoundedQueue(1);
        assert.strictEqual(bq.capacity, 1);
    });

    await t.test('BVA-Q1: Queue one element away from full', () => {
        const bq = new BoundedQueue(5);
        for (let i = 0; i < 4; i++) {
            bq.enqueue(i);
        }
        assert.strictEqual(bq.size, 4);
        assert.strictEqual(bq.is_full(), false);
    });

    await t.test('BVA-Q2: Queue one element away from empty', () => {
        const bq = new BoundedQueue(5);
        bq.enqueue(0);
        assert.strictEqual(bq.size, 1);
        assert.strictEqual(bq.is_empty(), false);
    });
});

// ============================================================================
// BONUS: SEQUENCE/STATE-BASED TESTING
// ============================================================================

test('Bonus: Sequence/State-Based Testing', async (t) => {
    await t.test('SEQ-1: Wrap-around logic - fill, partial dequeue, refill', () => {
        const bq = new BoundedQueue(5);
        
        // Fill the queue
        for (let i = 0; i < 5; i++) {
            bq.enqueue(i);
        }
        
        // Remove 3 elements
        for (let i = 0; i < 3; i++) {
            bq.dequeue();
        }
        
        // Add 3 new elements (should wrap around)
        for (let i = 10; i < 13; i++) {
            bq.enqueue(i);
        }
        
        // Verify FIFO order and wrap-around
        const expected = [3, 4, 10, 11, 12];
        for (let i = 0; i < 5; i++) {
            const val = bq.dequeue();
            assert.strictEqual(val, expected[i]);
        }
    });

    await t.test('SEQ-2: Mutator/Observer pairs - state transitions', () => {
        const bq = new BoundedQueue(3);
        
        // Initial state
        assert.strictEqual(bq.is_empty(), true);
        assert.strictEqual(bq.is_full(), false);
        
        // After enqueue
        bq.enqueue(1);
        assert.strictEqual(bq.is_empty(), false);
        assert.strictEqual(bq.is_full(), false);
        
        // Fill to capacity
        bq.enqueue(2);
        bq.enqueue(3);
        assert.strictEqual(bq.is_empty(), false);
        assert.strictEqual(bq.is_full(), true);
        
        // After dequeue
        bq.dequeue();
        assert.strictEqual(bq.is_empty(), false);
        assert.strictEqual(bq.is_full(), false);
    });
});
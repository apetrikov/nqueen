// Inhale, inscribe.
const ᚾ = Symbol()
const ᛊ = Symbol()
const ᛚ = Symbol()
const ᛞ = Symbol()

// Summon the void itself, and bind it with the essence of `ᚾ`. Need, nothingness, the frustrated longing to become.
type Nil = typeof ᚾ

// Smiling contentedly at the memory of Vidrun, complete the linked list.
type Cons<x, xs> = [x, xs]

// Truth, fire, a sun. Bound with ᛊ.
// Lies, falsehood, the depths of a lake. Bound with ᛚ.
type True = typeof ᛊ
type False = typeof ᛚ

type Not<b1> = b1 extends True ? False : b1 extends False ? True : never
type Or<b1, b2> = b1 extends True ? True : b2 extends True ? True : False

// Is there any truth? You sometimes wonder.
type AnyTrue<list> = list extends Cons<infer x, infer xs> ? x extends True ? True : AnyTrue<xs> : False

// Start by ensnaring zero. ᛞ, the day rune. Use a zero day and carry the zero.
type Zero = typeof ᛞ

type S<n> = [n]

type One   = S<Zero>
type Two   = S<One>
type Three = S<Two>
type Four  = S<Three>
type Five  = S<Four>
type Six   = S<Five>
type Seven = S<Six>

// Equality, difference. Important concepts in a company like this.
type Equals<a, b> = a extends S<infer a_>
    ? b extends S<infer b_>
        ? Equals<a_, b_>
        : False
    : b extends Zero
        ? True
        : False

type AbsDiff<a, b> = a extends S<infer a_>
    ? b extends S<infer b_>
        ? AbsDiff<a_, b_>
        : a
    : b extends S<any>
        ? b
        : Zero

type RangeFromZeroTo<n, xs = Nil> = n extends S<infer n_>
    ? RangeFromZeroTo<n_, Cons<n, xs>>
    : Cons<Zero, xs>

// Define a queen. Any queen of your clan would need more depth than just x and y,
// but keep it simple.
type Queen<x, y> = [x, y]

// Create a row of queens. Too threatening to be on the same row, at the same time,
// in the same universe. They will have to be divided across the multiverse. This
// too has happened, in the history of your kind.
type RowOfQueens<cols, row> = cols extends Cons<infer col, infer cols_>
    ? Cons<Queen<row, col>, RowOfQueens<cols_, row>>
    : cols

// You've swam upon the devil's lake, but never, never, never, never. You'll never
// make the same mistake. No, never, never, never.
type Threatens<a, b> = a extends Queen<infer ax, infer ay> ? b extends Queen<infer bx, infer by>
    ? Or<Or<Equals<ax, bx>, Equals<ay, by>>, Equals<AbsDiff<ax, bx>, AbsDiff<ay, by>>>
    : never : never

type ThreateningQueens<placedQueens, queen> = placedQueens extends Cons<infer placedQueen, infer placedQueens_>
    ? Cons<Threatens<placedQueen, queen>, ThreateningQueens<placedQueens_, queen>>
    : Nil
type Safe<placedQueens, queen> = Not<AnyTrue<ThreateningQueens<placedQueens, queen>>>

type FilterSafeQueens<candidates, placedQueens> = candidates extends Cons<infer q, infer qs>
    ? Safe<placedQueens, q> extends True
        ? Cons<q, FilterSafeQueens<qs, placedQueens>>
        : FilterSafeQueens<qs, placedQueens>
    : Nil

type Next<row, placedQueens = Nil> = FilterSafeQueens<RowOfQueens<RangeFromZeroTo<N>, row>, placedQueens>

// Two lovers, they waltz. Not every step forwards, but backtracking, spinning, gently alighting on the answer at just the right moment.
type SolveNextRow<row, placedQueens> = Solve<Next<S<row>, placedQueens>, S<row>, placedQueens>
type Solve<candidates, row, placedQueens> = Equals<row, N> extends True
    ? candidates extends Cons<infer x, any>
        ? Cons<x, placedQueens>
        : Nil
    : candidates extends Cons<infer x, infer xs>
        ? SolveNextRow<row, Cons<x, placedQueens>> extends Nil
            ? Solve<xs, row, placedQueens>
            : SolveNextRow<row, Cons<x, placedQueens>>
        : Nil

// The soultion
type N = Six
type Solution = Solve<Next<Zero>, Zero, Nil>

// For convenience, extract the position of the individual queens
type Index<list, n> = list extends Cons<infer x, infer xs>
    ? n extends S<infer n_>
        ? Index<xs, n_>
        : x
    : Nil

type q0 = Index<Solution, Zero>
type q1 = Index<Solution, One>
type q2 = Index<Solution, Two>
type q3 = Index<Solution, Three>
type q4 = Index<Solution, Four>
type q5 = Index<Solution, Five>
type q6 = Index<Solution, Six>
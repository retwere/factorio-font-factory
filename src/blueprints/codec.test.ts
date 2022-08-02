import { Blueprint } from './schema/items'
import { decode, encode } from './codec'

const blueprint: Blueprint = {
  blueprint: {
    icons: [
      {
        index: 1,
        signal: {
          name: 'signal-A',
          type: 'virtual'
        }
      }
    ],
    item: 'blueprint',
    label: 'A',
    'snap-to-grid': {
      x: 4,
      y: 5
    },
    tiles: [
      {
        name: 'refined-hazard-concrete-left',
        position: {
          x: 1,
          y: 1
        }
      },
      {
        name: 'refined-hazard-concrete-left',
        position: {
          x: 1,
          y: 2
        }
      },
      {
        name: 'refined-hazard-concrete-left',
        position: {
          x: 1,
          y: 3
        }
      },
      {
        name: 'refined-hazard-concrete-left',
        position: {
          x: 1,
          y: 4
        }
      },
      {
        name: 'refined-hazard-concrete-left',
        position: {
          x: 2,
          y: 0
        }
      },
      {
        name: 'refined-hazard-concrete-right',
        position: {
          x: 2,
          y: 2
        }
      },
      {
        name: 'refined-hazard-concrete-left',
        position: {
          x: 3,
          y: 1
        }
      },
      {
        name: 'refined-hazard-concrete-left',
        position: {
          x: 3,
          y: 2
        }
      },
      {
        name: 'refined-hazard-concrete-left',
        position: {
          x: 3,
          y: 3
        }
      },
      {
        name: 'refined-hazard-concrete-left',
        position: {
          x: 3,
          y: 4
        }
      }
    ],
    version: 281479275675648
  }
}

describe('encode', () => {
  it('produces a string that decodes to the original Blueprint', () => {
    expect(decode(encode(blueprint))).toStrictEqual(blueprint)
  })
})

describe('decode', () => {
  it('can decode an exported blueprint string', () => {
    const encoded =
      '0eNqlk8uOwjAMRf/F60SiTXllx3eMZhGoKZZCWqUG8VD+Hbcg2MxIQKQsHOvmXMnXucLaH7CLFBjsFfrgOs2tbiLVw/0EtlJwBjtNCmjThh7sj8ioCc4PAj53CBaOFPkgHQXB7YfGXaFXMLwLNQqoSL8KmDzeGV3bE1MbHjbFaFOkJyHilgLWeucuLtZavDcRGbXHLQv1H0CZCzC5gOp7QDkCJrmAN2YQqdn9STC5MZjcGExuDOazGGQpiXEvutdPUODdGmXBYSX1EWM/4stFUc2X5Xw6k1MtUroBNsIVJw=='
    expect(decode(encoded)).toStrictEqual(blueprint)
  })
})

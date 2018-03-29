export default {
  name: 'TOP',
  parent_id: null,
  children: [
    {
      name: 'L1',
      parent_id:1,
      children: [
        { name: 'L21', parent_id:{id:1}},
        { name: 'L22' },
        { name: 'A23' },
        {
          name: 'L24',
          parent_id:2,
          children: [
            {
              name: 'L31',
              parent_id:{id:1}
            },
            {
              name: 'L32 ',
              parent_id:3,
              children: [
                {
                  name: 'L41'
                },
                {
                  name: 'L42'
                },
                {
                  name: 'L43'
                }
              ]
            }
          ]
        }
      ]
    },
    { name: 'L12' },
    {
      name: 'L13',
       parent_id:{id:3},
      children: [
        { name: 'BL11' },
        { name: 'BL12' },
        { name: 'BL13' }
      ]
    }
  ]
};


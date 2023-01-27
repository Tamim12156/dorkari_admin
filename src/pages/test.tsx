import Family from '@components/Family';
import type { NextPage } from 'next';



const Test:NextPage = () => {
     const familyTree = {
        //Grandfather
        name: "John",
        age: 90,
        children: [
          {
            name: "Mary",
            age: 60,
          },
          {
            name: "Arthur",
            age: 60,
            children: [
              {
                name: "Lily",
                age: 35,
                children: [
                  {
                    name: "Hank",
                    age: 60,
                  },
                  {
                    name: "Henry",
                    age: 57,
                  },
                ],
              },
              {
                name: "Billy",
                age: 37,
              },
            ],
          },
          {
            name: "Dolores",
            age: 55,
          },
        ],
      };
    return (
        <div className='mt-5'>
            <Family familyTree={familyTree} />
        </div>
    );
};

export default Test;
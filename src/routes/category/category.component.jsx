import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import ProductCard from '../../components/product-card/product-card.component';

import { CategoriesContext } from '../../contexts/categories.context';

import { CategoryContainer, Title } from './category.styles';

import Spinner from '../../components/spinner/spinner.component';

const GET_CATEGORY = gql `
  query($title: String!) {
    getCollectionsByTitle(title: $title) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`

const Category = () => {
  const { category } = useParams();

  const {loading, error, data} = useQuery(GET_CATEGORY, {
    variables: {
      title: category
    }
  })

  console.log(data)
  useEffect(() => {
    if(data) {
      const {
        getCollectionsByTitle: { items}
      } = data;
      setProducts(items)
    }
  })

  const [products, setProducts] = useState([]);

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      {loading ? (
        <Spinner />
      ): (
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainer>
      )
      }

    </Fragment>
  );
};

export default Category;

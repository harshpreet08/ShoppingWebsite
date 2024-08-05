import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import formatPrice from 'utils/formatPrice';
import { ICartProduct } from 'models';
import { useCart } from 'contexts/cart-context';
import * as S from './style';

interface IProps {
  product: ICartProduct;
}

// Configure AWS SDK with your region
AWS.config.update({ region: 'us-east-1' });

// Function to access S3 and get the image URL
const accessS3 = async (sku: string): Promise<string | undefined> => {
  const s3 = new AWS.S3();

  try {
    const params = {
      Bucket: 'react-shopping-cart-term-assignment',
      Key: `products/${sku}-1-cart.webp`, // Use sku as a string
    };

    // Get the object from S3
    const data = await s3.getObject(params).promise();

    // Ensure data.Body is a Buffer or Uint8Array
    if (data.Body) {
      const blob = new Blob([data.Body as BlobPart], { type: 'image/webp' });
      return URL.createObjectURL(blob);
    } else {
      console.error('No data.Body received');
      return undefined;
    }
  } catch (error) {
    console.error('Error accessing S3:', error);
    return undefined;
  }
};

// React Component for Cart Product
const CartProduct: React.FC<IProps> = ({ product }) => {
  const { removeProduct, increaseProductQuantity, decreaseProductQuantity } =
    useCart();
  const {
    sku,
    title,
    price,
    style,
    currencyId,
    currencyFormat,
    availableSizes,
    quantity,
  } = product;

  const [imageSrc, setImageSrc] = useState<string | undefined>('');

  useEffect(() => {
    const fetchImage = async () => {
      const imageUrl = await accessS3(sku.toString()); // Convert sku to string
      setImageSrc(imageUrl || ''); // Default to empty string if undefined
    };

    fetchImage();
  }, [sku]);

  const handleRemoveProduct = () => removeProduct(product);
  const handleIncreaseProductQuantity = () => increaseProductQuantity(product);
  const handleDecreaseProductQuantity = () => decreaseProductQuantity(product);

  return (
    <S.Container>
      <S.DeleteButton
        onClick={handleRemoveProduct}
        title="remove product from cart"
      />
      {imageSrc && <S.Image src={imageSrc} alt={title} />}
      <S.Details>
        <S.Title>{title}</S.Title>
        <S.Desc>
          {`${availableSizes[0]} | ${style}`} <br />
          Quantity: {quantity}
        </S.Desc>
      </S.Details>
      <S.Price>
        <p>{`${currencyFormat} ${formatPrice(price, currencyId)}`}</p>
        <div>
          <S.ChangeQuantity
            onClick={handleDecreaseProductQuantity}
            disabled={quantity === 1}
          >
            -
          </S.ChangeQuantity>
          <S.ChangeQuantity onClick={handleIncreaseProductQuantity}>
            +
          </S.ChangeQuantity>
        </div>
      </S.Price>
    </S.Container>
  );
};

export default CartProduct;

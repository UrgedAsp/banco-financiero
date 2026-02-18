import { getProducts } from "@/core/products/actions/get-products.action";
import CardProduct from "@/presentation/components/CardProduct";
import CustomButton from "@/presentation/components/CustomButton";
import InputText from "@/presentation/components/InputText";
import { globalStyles } from "@/presentation/styles/global-styles";
import useProductStore from "@/store/useProductStore";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default function Home() {

  const [search, setSearch] = useState("");
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { setSelectedProduct } = useProductStore();
  const filteredProducts = data?.data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <View
      style={[globalStyles.flexCenter, { paddingHorizontal: 24 }]}
    >
      {isLoading && <ActivityIndicator size={"large"} color={'#000000'} />}
      {error ? <Text>Error al cargar los productos</Text> :
        data && data.data.length > 0 ? (
          <View style={styles.container}>
            <InputText placeholder="Buscar" onChangeText={(text) => setSearch(text)} value={search} />
            {filteredProducts && filteredProducts.length === 0 ? (
              <Text>No se encontraron productos</Text>
            ) : (
              <FlatList
                data={filteredProducts}
                renderItem={({ item }) => (
                  <CardProduct product={item} onPress={() => { setSelectedProduct(item); router.push(`/product/${item.id}`) }} />
                )}
                keyExtractor={(item) => item.id}
              />
            )}
          </View>
        ) : (
          <Text>No hay productos</Text>
        )
      }
      <View style={styles.buttonContainer}>
        <CustomButton type="primary" title="Agregar" onPress={() => { }} />
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
    paddingTop: 24,
    flex: 1,
    width: "100%",
    gap: 32,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 16,
    width: "100%",
  }
});

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  buildVolume: string;
  printSpeed: number;
  power: number;
  inStock: boolean;
  featured?: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Bambu Lab X1-Carbon',
    price: 149990,
    image: 'https://cdn.poehali.dev/projects/0cafb0ab-a1a5-4b26-ac8e-5e3ba91f5915/files/cbe27ed5-7e8c-43bd-9e15-25487c9c9610.jpg',
    category: 'Профессиональные',
    buildVolume: '256×256×256 мм',
    printSpeed: 500,
    power: 350,
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: 'Bambu Lab P1P',
    price: 89990,
    image: 'https://cdn.poehali.dev/projects/0cafb0ab-a1a5-4b26-ac8e-5e3ba91f5915/files/a3ca62be-1c85-4adc-a266-df3af48cf73a.jpg',
    category: 'Для начинающих',
    buildVolume: '256×256×256 мм',
    printSpeed: 500,
    power: 300,
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: 'Bambu Lab A1 Mini',
    price: 44990,
    image: 'https://cdn.poehali.dev/projects/0cafb0ab-a1a5-4b26-ac8e-5e3ba91f5915/files/fa1e9654-d9aa-4496-8547-f4ee11e9e6f7.jpg',
    category: 'Компактные',
    buildVolume: '180×180×180 мм',
    printSpeed: 300,
    power: 150,
    inStock: true,
    featured: true
  },
  {
    id: 4,
    name: 'Bambu Lab X1E',
    price: 179990,
    image: 'https://cdn.poehali.dev/projects/0cafb0ab-a1a5-4b26-ac8e-5e3ba91f5915/files/cbe27ed5-7e8c-43bd-9e15-25487c9c9610.jpg',
    category: 'Профессиональные',
    buildVolume: '256×256×256 мм',
    printSpeed: 500,
    power: 400,
    inStock: true
  },
  {
    id: 5,
    name: 'Bambu Lab A1',
    price: 59990,
    image: 'https://cdn.poehali.dev/projects/0cafb0ab-a1a5-4b26-ac8e-5e3ba91f5915/files/fa1e9654-d9aa-4496-8547-f4ee11e9e6f7.jpg',
    category: 'Для начинающих',
    buildVolume: '256×256×256 мм',
    printSpeed: 300,
    power: 200,
    inStock: true
  },
  {
    id: 6,
    name: 'Bambu Lab P1S',
    price: 109990,
    image: 'https://cdn.poehali.dev/projects/0cafb0ab-a1a5-4b26-ac8e-5e3ba91f5915/files/a3ca62be-1c85-4adc-a266-df3af48cf73a.jpg',
    category: 'Профессиональные',
    buildVolume: '256×256×256 мм',
    printSpeed: 500,
    power: 320,
    inStock: false
  }
];

const Index = () => {
  const [currentSection, setCurrentSection] = useState<'home' | 'catalog' | 'about' | 'delivery' | 'contacts' | 'faq'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [priceRange, setPriceRange] = useState<[number]>([200000]);
  const [speedRange, setSpeedRange] = useState<[number]>([500]);
  const [powerRange, setPowerRange] = useState<[number]>([400]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = products.filter(p => 
    p.price <= priceRange[0] && 
    p.printSpeed <= speedRange[0] &&
    p.power <= powerRange[0]
  );

  const featuredProducts = products.filter(p => p.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5">
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentSection('home')}>
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Box" className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                3D Print Store
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => setCurrentSection('home')} className="text-foreground/80 hover:text-primary transition-colors font-medium">
                Главная
              </button>
              <button onClick={() => setCurrentSection('catalog')} className="text-foreground/80 hover:text-primary transition-colors font-medium">
                Каталог
              </button>
              <button onClick={() => setCurrentSection('about')} className="text-foreground/80 hover:text-primary transition-colors font-medium">
                О компании
              </button>
              <button onClick={() => setCurrentSection('delivery')} className="text-foreground/80 hover:text-primary transition-colors font-medium">
                Доставка
              </button>
              <button onClick={() => setCurrentSection('contacts')} className="text-foreground/80 hover:text-primary transition-colors font-medium">
                Контакты
              </button>
              <button onClick={() => setCurrentSection('faq')} className="text-foreground/80 hover:text-primary transition-colors font-medium">
                FAQ
              </button>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Icon name="ShoppingBag" size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Корзина пуста</p>
                    </div>
                  ) : (
                    <>
                      {cart.map(item => (
                        <Card key={item.id}>
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                              <div className="flex-1">
                                <h4 className="font-semibold">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">{item.price.toLocaleString('ru-RU')} ₽</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Button 
                                    variant="outline" 
                                    size="icon" 
                                    className="h-7 w-7"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  >
                                    <Icon name="Minus" size={14} />
                                  </Button>
                                  <span className="w-8 text-center">{item.quantity}</span>
                                  <Button 
                                    variant="outline" 
                                    size="icon" 
                                    className="h-7 w-7"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <Icon name="Plus" size={14} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className="ml-auto h-7 w-7"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    <Icon name="Trash2" size={14} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <div className="pt-4 border-t">
                        <div className="flex justify-between mb-4">
                          <span className="text-lg font-semibold">Итого:</span>
                          <span className="text-2xl font-bold text-primary">{cartTotal.toLocaleString('ru-RU')} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        {currentSection === 'home' && (
          <>
            <section className="mb-20 animate-fade-in">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <Badge className="bg-gradient-to-r from-primary to-secondary text-white">
                    Новинка 2024
                  </Badge>
                  <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                    Революция в
                    <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"> 3D печати</span>
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Профессиональные 3D-принтеры Bambu Lab. Скорость до 500 мм/с, точность микронного уровня.
                  </p>
                  <div className="flex gap-4">
                    <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90" onClick={() => setCurrentSection('catalog')}>
                      <Icon name="ShoppingBag" size={20} className="mr-2" />
                      Выбрать принтер
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => setCurrentSection('about')}>
                      Узнать больше
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">500+</div>
                      <div className="text-sm text-muted-foreground">Довольных клиентов</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-secondary">24/7</div>
                      <div className="text-sm text-muted-foreground">Поддержка</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent">2 года</div>
                      <div className="text-sm text-muted-foreground">Гарантия</div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl animate-pulse"></div>
                  <img 
                    src="https://cdn.poehali.dev/projects/0cafb0ab-a1a5-4b26-ac8e-5e3ba91f5915/files/cbe27ed5-7e8c-43bd-9e15-25487c9c9610.jpg" 
                    alt="3D Printer" 
                    className="relative rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </section>

            <section className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Популярные модели</h2>
                <p className="text-xl text-muted-foreground">Лучшие предложения для профессионалов и начинающих</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {featuredProducts.map((product, idx) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-in" style={{ animationDelay: `${idx * 100}ms` }}>
                    <div className="relative overflow-hidden group">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <Badge className="absolute top-4 right-4 bg-accent">Хит продаж</Badge>
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-xl">{product.name}</CardTitle>
                        {product.inStock ? (
                          <Badge variant="outline" className="text-green-600 border-green-600">В наличии</Badge>
                        ) : (
                          <Badge variant="outline" className="text-red-600 border-red-600">Под заказ</Badge>
                        )}
                      </div>
                      <CardDescription>{product.category}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Box" size={16} />
                        <span>{product.buildVolume}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Gauge" size={16} />
                        <span>{product.printSpeed} мм/с</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Zap" size={16} />
                        <span>{product.power} Вт</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary">{product.price.toLocaleString('ru-RU')} ₽</span>
                      <Button onClick={() => addToCart(product)} className="bg-gradient-to-r from-primary to-secondary">
                        <Icon name="ShoppingCart" size={18} className="mr-2" />
                        В корзину
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button variant="outline" size="lg" onClick={() => setCurrentSection('catalog')}>
                  Посмотреть все модели
                  <Icon name="ArrowRight" size={18} className="ml-2" />
                </Button>
              </div>
            </section>

            <section className="mb-20">
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { icon: 'Truck', title: 'Быстрая доставка', desc: 'По всей России за 1-3 дня' },
                  { icon: 'Shield', title: 'Гарантия 2 года', desc: 'Официальная поддержка' },
                  { icon: 'HeadphonesIcon', title: 'Поддержка 24/7', desc: 'Всегда на связи' },
                  { icon: 'Award', title: 'Лучшие цены', desc: 'Официальный дилер' }
                ].map((feature, idx) => (
                  <Card key={idx} className="text-center p-6 hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
                      <Icon name={feature.icon as any} size={32} className="text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}

        {currentSection === 'catalog' && (
          <div className="animate-fade-in">
            <h1 className="text-4xl font-bold mb-8">Каталог 3D-принтеров</h1>
            <div className="grid lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Фильтры</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Цена до: {priceRange[0].toLocaleString('ru-RU')} ₽</label>
                      <Slider 
                        value={priceRange} 
                        onValueChange={(val) => setPriceRange(val as [number])}
                        max={200000} 
                        step={10000} 
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Скорость до: {speedRange[0]} мм/с</label>
                      <Slider 
                        value={speedRange} 
                        onValueChange={(val) => setSpeedRange(val as [number])}
                        max={500} 
                        step={50} 
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Мощность до: {powerRange[0]} Вт</label>
                      <Slider 
                        value={powerRange} 
                        onValueChange={(val) => setPowerRange(val as [number])}
                        max={400} 
                        step={50} 
                        className="mt-2"
                      />
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setPriceRange([200000]);
                        setSpeedRange([500]);
                        setPowerRange([400]);
                      }}
                    >
                      Сбросить фильтры
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-3">
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredProducts.map(product => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="relative overflow-hidden group">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {product.featured && <Badge className="absolute top-4 right-4 bg-accent">Хит</Badge>}
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle>{product.name}</CardTitle>
                          {product.inStock ? (
                            <Badge variant="outline" className="text-green-600 border-green-600">В наличии</Badge>
                          ) : (
                            <Badge variant="outline" className="text-red-600 border-red-600">Под заказ</Badge>
                          )}
                        </div>
                        <CardDescription>{product.category}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon name="Box" size={16} />
                          <span>{product.buildVolume}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon name="Gauge" size={16} />
                          <span>{product.printSpeed} мм/с</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon name="Zap" size={16} />
                          <span>{product.power} Вт</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-primary">{product.price.toLocaleString('ru-RU')} ₽</span>
                        <Button onClick={() => addToCart(product)} className="bg-gradient-to-r from-primary to-secondary">
                          <Icon name="ShoppingCart" size={18} className="mr-2" />
                          В корзину
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentSection === 'about' && (
          <div className="max-w-4xl mx-auto animate-fade-in space-y-8">
            <h1 className="text-4xl font-bold mb-8">О компании</h1>
            <Card>
              <CardContent className="p-8 space-y-4">
                <p className="text-lg">
                  Мы — официальный дилер Bambu Lab в России. Наша миссия — делать профессиональную 3D-печать доступной для каждого.
                </p>
                <p className="text-lg">
                  С 2020 года мы помогаем дизайнерам, инженерам и энтузиастам воплощать их идеи в жизнь с помощью передовых технологий 3D-печати.
                </p>
                <div className="grid md:grid-cols-3 gap-6 pt-6">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-2">500+</div>
                    <div className="text-sm text-muted-foreground">Довольных клиентов</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-3xl font-bold text-secondary mb-2">4 года</div>
                    <div className="text-sm text-muted-foreground">На рынке</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-3xl font-bold text-accent mb-2">100%</div>
                    <div className="text-sm text-muted-foreground">Оригинальная продукция</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentSection === 'delivery' && (
          <div className="max-w-4xl mx-auto animate-fade-in space-y-8">
            <h1 className="text-4xl font-bold mb-8">Доставка и оплата</h1>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Truck" className="text-primary" />
                    Доставка
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">По Москве и МО</h4>
                    <p className="text-sm text-muted-foreground">Курьером — бесплатно при заказе от 50 000 ₽</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">По России</h4>
                    <p className="text-sm text-muted-foreground">CDEK, Boxberry — 1-3 дня</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Самовывоз</h4>
                    <p className="text-sm text-muted-foreground">Бесплатно из офиса в Москве</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="CreditCard" className="text-primary" />
                    Оплата
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">Картой онлайн</h4>
                    <p className="text-sm text-muted-foreground">Visa, Mastercard, МИР</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">При получении</h4>
                    <p className="text-sm text-muted-foreground">Наличными или картой</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Для юр. лиц</h4>
                    <p className="text-sm text-muted-foreground">По счету с НДС</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {currentSection === 'contacts' && (
          <div className="max-w-4xl mx-auto animate-fade-in space-y-8">
            <h1 className="text-4xl font-bold mb-8">Контакты</h1>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Свяжитесь с нами</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Phone" className="text-primary" size={20} />
                    </div>
                    <div>
                      <div className="font-semibold">+7 (495) 123-45-67</div>
                      <div className="text-sm text-muted-foreground">Ежедневно 9:00 - 21:00</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Mail" className="text-secondary" size={20} />
                    </div>
                    <div>
                      <div className="font-semibold">info@3dprintstore.ru</div>
                      <div className="text-sm text-muted-foreground">Ответим в течение часа</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Icon name="MapPin" className="text-accent" size={20} />
                    </div>
                    <div>
                      <div className="font-semibold">г. Москва</div>
                      <div className="text-sm text-muted-foreground">ул. Примерная, д. 123</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Остались вопросы?</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <Input placeholder="Ваше имя" />
                    <Input type="email" placeholder="Email" />
                    <Input placeholder="Телефон" />
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                      Отправить
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {currentSection === 'faq' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-4xl font-bold mb-8">Часто задаваемые вопросы</h1>
            <Card>
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-left">Какая гарантия на принтеры?</AccordionTrigger>
                    <AccordionContent>
                      Все принтеры Bambu Lab поставляются с официальной гарантией производителя сроком 2 года. Мы обеспечиваем полную техническую поддержку и гарантийное обслуживание на территории России.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-left">Какие материалы можно использовать?</AccordionTrigger>
                    <AccordionContent>
                      Принтеры Bambu Lab поддерживают широкий спектр материалов: PLA, PETG, ABS, ASA, TPU, нейлон, поликарбонат и композитные материалы с углеродным волокном. Модели X1-Carbon и X1E оснащены подогреваемой камерой для печати высокотемпературными пластиками.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-left">Нужен ли опыт для работы с принтером?</AccordionTrigger>
                    <AccordionContent>
                      Принтеры Bambu Lab спроектированы для максимальной простоты использования. Модели A1 Mini и A1 идеально подходят для начинающих благодаря автоматической калибровке и интуитивному интерфейсу. Мы предоставляем подробные инструкции и обучающие материалы.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-left">Как быстро вы доставляете?</AccordionTrigger>
                    <AccordionContent>
                      По Москве доставка осуществляется на следующий день. По России — от 1 до 3 дней в зависимости от региона. Все принтеры всегда в наличии на нашем складе.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-left">Можно ли вернуть товар?</AccordionTrigger>
                    <AccordionContent>
                      Да, вы можете вернуть товар в течение 14 дней с момента получения при условии сохранения товарного вида и комплектации. Мы вернем вам полную стоимость заказа.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="bg-muted/50 border-t mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Box" className="text-white" size={18} />
                </div>
                <span className="font-bold text-lg">3D Print Store</span>
              </div>
              <p className="text-sm text-muted-foreground">Официальный дилер Bambu Lab в России</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="cursor-pointer hover:text-foreground" onClick={() => setCurrentSection('about')}>О компании</div>
                <div className="cursor-pointer hover:text-foreground" onClick={() => setCurrentSection('delivery')}>Доставка</div>
                <div className="cursor-pointer hover:text-foreground" onClick={() => setCurrentSection('contacts')}>Контакты</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="cursor-pointer hover:text-foreground" onClick={() => setCurrentSection('catalog')}>Все принтеры</div>
                <div className="cursor-pointer hover:text-foreground" onClick={() => setCurrentSection('catalog')}>Для начинающих</div>
                <div className="cursor-pointer hover:text-foreground" onClick={() => setCurrentSection('catalog')}>Профессиональные</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>+7 (495) 123-45-67</div>
                <div>info@3dprintstore.ru</div>
                <div>г. Москва, ул. Примерная, 123</div>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 3D Print Store. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

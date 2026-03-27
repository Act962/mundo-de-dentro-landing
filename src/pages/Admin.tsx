import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  LogOut,
  Save,
  Image as ImageIcon,
  Plus,
  Trash2,
  LayoutDashboard,
  User,
  MessageCircle,
  Info,
} from "lucide-react";
import { useQueryState } from "nuqs";

const API_BASE = (import.meta.env.VITE_API_URL || "") + "/api";

const Admin = () => {
  const [view, setView] = useQueryState("section_page", {
    defaultValue: "hero",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("admin_token"));
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      fetchContent();
    }
  }, [token]);

  const fetchContent = async () => {
    try {
      const res = await fetch(`${API_BASE}/content`);
      const data = await res.json();
      setContent(data);
    } catch (error) {
      toast.error("Erro ao carregar conteúdo");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const { token } = await res.json();
        localStorage.setItem("admin_token", token);
        setToken(token);
        setIsLoggedIn(true);
        toast.success("Login realizado com sucesso");
      } else {
        toast.error("Credenciais inválidas");
      }
    } catch (error) {
      toast.error("Erro ao conectar ao servidor");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
    setIsLoggedIn(false);
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    section: string,
    field: string,
    arrayField?: string,
    index?: number,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        const { url } = await res.json();
        if (arrayField !== undefined && index !== undefined) {
          handleArrayChange(section, arrayField, index, field, url);
        } else {
          handleInputChange(section, field, url);
        }
        toast.success("Imagem enviada com sucesso");
      } else {
        toast.error("Erro ao enviar imagem");
      }
    } catch (error) {
      toast.error("Erro de conexão no upload");
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/content`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(content),
      });

      if (res.ok) {
        toast.success("Conteúdo salvo com sucesso");
      } else {
        toast.error("Erro ao salvar conteúdo");
      }
    } catch (error) {
      toast.error("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (section: string, field: string, value: any) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleArrayChange = (
    section: string,
    arrayField: string,
    index: number,
    field: string,
    value: any,
  ) => {
    const newArray = [...content[section][arrayField]];
    newArray[index] = { ...newArray[index], [field]: value };
    setContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [arrayField]: newArray,
      },
    }));
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-md shadow-lg border-primary/20">
          <CardHeader className="text-center space-y-2">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
              <LayoutDashboard className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-display font-bold">
              Mundo de Dentro
            </CardTitle>
            <CardDescription>Painel Administrativo CMS</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Usuário</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button type="submit" className="w-full h-12 text-lg">
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!content) return <div className="p-8 text-center">Carregando...</div>;

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-primary" />
            <span className="font-display font-bold text-xl hidden sm:inline-block">
              Admin Mundo de Dentro
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={handleSave}
              disabled={loading}
              className="gap-2 px-6"
            >
              <Save className="w-4 h-4" />
              {loading ? "Salvando..." : "Salvar Alterações"}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              title="Sair"
            >
              <LogOut className="w-5 h-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Tabs value={view} onValueChange={setView} className="space-y-6">
          <TabsList className="bg-background border border-border h-auto flex flex-wrap justify-start p-1 gap-1">
            <TabsTrigger value="hero" className="flex-1 min-w-[100px]">
              Hero
            </TabsTrigger>
            <TabsTrigger value="about" className="flex-1 min-w-[100px]">
              Sobre
            </TabsTrigger>
            <TabsTrigger value="services" className="flex-1 min-w-[100px]">
              Serviços
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex-1 min-w-[100px]">
              Galeria
            </TabsTrigger>
            <TabsTrigger value="team" className="flex-1 min-w-[100px]">
              Equipe
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex-1 min-w-[100px]">
              Depoimentos
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex-1 min-w-[100px]">
              Contato
            </TabsTrigger>
          </TabsList>

          {/* HERO SECTION */}
          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>
                  Edite os textos principais da primeira seção do site.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Tagline (Opcional)</Label>
                  <Input
                    value={content.hero.tagline}
                    onChange={(e) =>
                      handleInputChange("hero", "tagline", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Descrição</Label>
                  <Textarea
                    value={content.hero.description}
                    onChange={(e) =>
                      handleInputChange("hero", "description", e.target.value)
                    }
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Texto Botão Principal</Label>
                    <Input
                      value={content.hero.cta_primary.text}
                      onChange={(e) => {
                        const newCta = {
                          ...content.hero.cta_primary,
                          text: e.target.value,
                        };
                        handleInputChange("hero", "cta_primary", newCta);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Link Botão Principal (WhatsApp)</Label>
                    <Input
                      value={content.hero.cta_primary.link}
                      onChange={(e) => {
                        const newCta = {
                          ...content.hero.cta_primary,
                          link: e.target.value,
                        };
                        handleInputChange("hero", "cta_primary", newCta);
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label>Imagem de Fundo (Hero)</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageUpload(e, "hero", "background")
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ABOUT SECTION */}
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>Sobre Nós</CardTitle>
                <CardDescription>
                  Edite a história e os valores da clínica.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Título</Label>
                  <Input
                    value={content.about.title}
                    onChange={(e) =>
                      handleInputChange("about", "title", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>História</Label>
                  <Textarea
                    value={content.about.description}
                    onChange={(e) =>
                      handleInputChange("about", "description", e.target.value)
                    }
                    rows={6}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Público Alvo</Label>
                  <Input
                    value={content.about.target_audience}
                    onChange={(e) =>
                      handleInputChange(
                        "about",
                        "target_audience",
                        e.target.value,
                      )
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* GALLERY SECTION */}
          <TabsContent value="gallery">
            <Card>
              <CardHeader>
                <CardTitle>Galeria</CardTitle>
                <CardDescription>Gerencie as fotos do espaço.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {content.gallery.photos.map((photo: any, index: number) => (
                  <div
                    key={index}
                    className="p-4 border border-border rounded-xl space-y-4 bg-muted/5"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold">Foto #{index + 1}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive h-8 px-2"
                        onClick={() => {
                          const newPhotos = [...content.gallery.photos];
                          newPhotos.splice(index, 1);
                          handleInputChange("gallery", "photos", newPhotos);
                        }}
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Remover
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Legenda (Tag)</Label>
                        <Input
                          value={photo.label}
                          onChange={(e) =>
                            handleArrayChange(
                              "gallery",
                              "photos",
                              index,
                              "label",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Texto Alternativo</Label>
                        <Input
                          value={photo.alt}
                          onChange={(e) =>
                            handleArrayChange(
                              "gallery",
                              "photos",
                              index,
                              "alt",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Arquivo da Imagem</Label>
                        <div className="flex items-center gap-4">
                          {photo.src && (
                            <img
                              src={
                                photo.src.startsWith("http") ||
                                photo.src.startsWith("/")
                                  ? photo.src
                                  : `http://localhost:3001${photo.src}`
                              }
                              alt="Preview"
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          )}
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageUpload(
                                e,
                                "gallery",
                                "src",
                                "photos",
                                index,
                              )
                            }
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => {
                    const newPhotos = [
                      ...content.gallery.photos,
                      { src: "", alt: "", label: "" },
                    ];
                    handleInputChange("gallery", "photos", newPhotos);
                  }}
                >
                  <Plus className="w-4 h-4" /> Adicionar Foto
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TESTIMONIALS SECTION */}
          <TabsContent value="testimonials">
            <Card>
              <CardHeader>
                <CardTitle>Depoimentos</CardTitle>
                <CardDescription>
                  Gerencie o que as famílias dizem.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {content.testimonials.list.map((t: any, index: number) => (
                  <div
                    key={index}
                    className="p-4 border border-border rounded-xl space-y-4 bg-muted/5"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold">Depoimento #{index + 1}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive h-8 px-2"
                        onClick={() => {
                          const newList = [...content.testimonials.list];
                          newList.splice(index, 1);
                          handleInputChange("testimonials", "list", newList);
                        }}
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Remover
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label>Texto</Label>
                      <Textarea
                        value={t.text}
                        onChange={(e) =>
                          handleArrayChange(
                            "testimonials",
                            "list",
                            index,
                            "text",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Autor</Label>
                      <Input
                        value={t.author}
                        onChange={(e) =>
                          handleArrayChange(
                            "testimonials",
                            "list",
                            index,
                            "author",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => {
                    const newList = [
                      ...content.testimonials.list,
                      { text: "", author: "", rating: 5 },
                    ];
                    handleInputChange("testimonials", "list", newList);
                  }}
                >
                  <Plus className="w-4 h-4" /> Adicionar Depoimento
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TEAM SECTION */}
          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle>Equipe</CardTitle>
                <CardDescription>
                  Gerencie os profissionais que aparecem no site.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {content.team.members.map((member: any, index: number) => (
                  <div
                    key={index}
                    className="p-4 border border-border rounded-xl space-y-4 bg-muted/5"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold">Membro #{index + 1}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive h-8 px-2"
                        onClick={() => {
                          const newMembers = [...content.team.members];
                          newMembers.splice(index, 1);
                          handleInputChange("team", "members", newMembers);
                        }}
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Remover
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nome</Label>
                        <Input
                          value={member.name}
                          onChange={(e) =>
                            handleArrayChange(
                              "team",
                              "members",
                              index,
                              "name",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Cargo/Especialidade</Label>
                        <Input
                          value={member.role}
                          onChange={(e) =>
                            handleArrayChange(
                              "team",
                              "members",
                              index,
                              "role",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Foto do Profissional</Label>
                        <div className="flex items-center gap-4">
                          {member.photo && (
                            <img
                              src={
                                member.photo.startsWith("http") ||
                                member.photo.startsWith("/")
                                  ? member.photo
                                  : `http://localhost:3001${member.photo}`
                              }
                              alt="Preview"
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          )}
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageUpload(
                                e,
                                "team",
                                "photo",
                                "members",
                                index,
                              )
                            }
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => {
                    const newMembers = [
                      ...content.team.members,
                      { name: "", role: "", specialties: [], photo: null },
                    ];
                    handleInputChange("team", "members", newMembers);
                  }}
                >
                  <Plus className="w-4 h-4" /> Adicionar Profissional
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CONTACT SECTION */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contato</CardTitle>
                <CardDescription>
                  Informações de contato e rodapé.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>WhatsApp (Exibição)</Label>
                    <Input
                      value={content.contact.whatsapp}
                      onChange={(e) =>
                        handleInputChange("contact", "whatsapp", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>WhatsApp Link (API)</Label>
                    <Input
                      value={content.contact.whatsapp_link}
                      onChange={(e) =>
                        handleInputChange(
                          "contact",
                          "whatsapp_link",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>E-mail</Label>
                  <Input
                    value={content.contact.email}
                    onChange={(e) =>
                      handleInputChange("contact", "email", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Horário de Funcionamento</Label>
                  <Input
                    value={content.contact.hours}
                    onChange={(e) =>
                      handleInputChange("contact", "hours", e.target.value)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Help bar */}
      <div className="fixed bottom-4 right-4 z-40">
        <Card className="shadow-2xl border-primary/20 bg-background/95 backdrop-blur">
          <CardContent className="p-3 flex items-center gap-3">
            <Info className="w-5 h-5 text-primary" />
            <p className="text-xs text-muted-foreground max-w-[200px]">
              As alterações aparecem no site instantaneamente após salvar.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;

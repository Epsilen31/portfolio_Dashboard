import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Trash2, Edit, MapPin, Award, Code, GraduationCap, Briefcase, Calendar, Plus } from "lucide-react";
import {
  clearAllTimelineErrors,
  deleteTimeline,
  getAllTimeline,
  resetTimeline,
} from "@/store/slices/timelineSlice";

const ManageTimeline = () => {
  const navigateTo = useNavigate();
  
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };
  
  const { loading, timeline, error, message } = useSelector(
    (state) => state.timeline
  );
  const dispatch = useDispatch();

  const handleDeleteTimeline = (id) => {
    if (window.confirm("Are you sure you want to delete this timeline entry?")) {
      dispatch(deleteTimeline(id));
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'education': return <GraduationCap className="w-4 h-4" />;
      case 'internship': return <Briefcase className="w-4 h-4" />;
      case 'fulltime': return <Code className="w-4 h-4" />;
      case 'freelance': return <Calendar className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'education': return 'bg-blue-100 text-blue-800';
      case 'internship': return 'bg-green-100 text-green-800';
      case 'fulltime': return 'bg-purple-100 text-purple-800';
      case 'freelance': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'education': return 'Education';
      case 'internship': return 'Internship';
      case 'fulltime': return 'Full Time';
      case 'freelance': return 'Freelance';
      default: return 'Experience';
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetTimeline());
      dispatch(getAllTimeline());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, loading, error]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Tabs defaultValue="week">
        <TabsContent value="week">
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Manage Your Timeline</CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => navigateTo("/")}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add New Timeline
                </Button>
                <Button className="w-fit" onClick={handleReturnToDashboard}>
                  Return to Dashboard
                </Button>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="md:table-cell">Type</TableHead>
                    <TableHead className="md:table-cell">Location</TableHead>
                    <TableHead className="md:table-cell">Description</TableHead>
                    <TableHead className="md:table-cell">From</TableHead>
                    <TableHead className="md:table-cell">To</TableHead>
                    <TableHead className="md:table-cell">Achievements</TableHead>
                    <TableHead className="md:table-cell">Skills</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timeline?.data?.length > 0 ? (
                    timeline.data.map((element) => {
                      return (
                        <TableRow className="bg-accent" key={element._id}>
                          <TableCell className="font-medium">
                            {element.title}
                          </TableCell>
                          <TableCell className="md:table-cell">
                            <Badge className={`${getTypeColor(element.type)} flex items-center gap-1`}>
                              {getTypeIcon(element.type)}
                              {getTypeLabel(element.type)}
                            </Badge>
                          </TableCell>
                          <TableCell className="md:table-cell">
                            {element.location ? (
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="w-3 h-3" />
                                {element.location}
                              </div>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell className="md:table-cell max-w-xs">
                            <div className="text-sm text-muted-foreground line-clamp-2">
                              {element.description}
                            </div>
                          </TableCell>
                          <TableCell className="md:table-cell">
                            <span className="text-sm font-medium">{element.timeline?.from || element.from}</span>
                          </TableCell>
                          <TableCell className="md:table-cell">
                            <span className="text-sm font-medium">
                              {element.timeline?.to || element.to ? (element.timeline?.to || element.to) : (
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                  Present
                                </Badge>
                              )}
                            </span>
                          </TableCell>
                          <TableCell className="md:table-cell">
                            {element.achievements && element.achievements.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {element.achievements.slice(0, 2).map((achievement, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {achievement.length > 20 ? `${achievement.substring(0, 20)}...` : achievement}
                                  </Badge>
                                ))}
                                {element.achievements.length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{element.achievements.length - 2} more
                                  </Badge>
                                )}
                              </div>
                            ) : (
                              <span className="text-muted-foreground text-sm">-</span>
                            )}
                          </TableCell>
                          <TableCell className="md:table-cell">
                            {element.skills && element.skills.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {element.skills.slice(0, 2).map((skill, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {skill.length > 15 ? `${skill.substring(0, 15)}...` : skill}
                                  </Badge>
                                ))}
                                {element.skills.length > 2 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{element.skills.length - 2} more
                                  </Badge>
                                )}
                              </div>
                            ) : (
                              <span className="text-muted-foreground text-sm">-</span>
                            )}
                          </TableCell>
                          <TableCell className="flex justify-end gap-2">
                            <button
                              className="border-blue-600 border-2 rounded-full h-8 w-8 flex 
                              justify-center items-center text-blue-600 hover:text-slate-50 hover:bg-blue-600 transition-colors"
                              title="Edit Timeline"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              className="border-red-600 border-2 rounded-full h-8 w-8 flex 
                              justify-center items-center text-red-600 hover:text-slate-50 hover:bg-red-600 transition-colors"
                              onClick={() => handleDeleteTimeline(element._id)}
                              title="Delete Timeline"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                        <div className="flex flex-col items-center gap-2">
                          <Calendar className="w-8 h-8" />
                          <span className="text-lg">You have not added any timeline entries yet.</span>
                          <span className="text-sm">Click on "Add Timeline" in the sidebar to get started.</span>
                          <Button 
                            variant="outline" 
                            onClick={() => navigateTo("/")}
                            className="mt-2 flex items-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Go to Add Timeline
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageTimeline;
